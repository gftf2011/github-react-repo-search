import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import {
  Form,
  SubmitButton,
  List,
  CustomLink as Link,
  ErrorMessage,
} from './styles';
import Container from '../../components/Container';

import DuplicatedRepoError from '../../error/DuplicatedRepo';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      newRepo: '',
      loading: false,
      repositories: [],
      error: {
        hasError: false,
        message: '',
      },
    };
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (event) => {
    this.setState({
      newRepo: event.target.value,
      error: { hassError: false, message: '' },
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      this.setState({ loading: true });

      const { newRepo, repositories } = this.state;

      const response = await api.get(`/repos/${newRepo}`);

      const repositoryExists = repositories.find(
        (repository) => repository === response.data.full_name
      );

      if (repositoryExists) {
        throw new DuplicatedRepoError();
      }

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        newRepo: '',
        repositories: [...repositories, data.name],
      });
    } catch (err) {
      if (err instanceof DuplicatedRepoError) {
        this.setState({
          error: { hasError: true, message: err.message },
        });
      } else {
        this.setState({
          error: { hasError: true, message: 'Repositório não existe!' },
        });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} hasError={error.hasError}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFFFFF" size={14} />
            ) : (
              <FaPlus color="#FFFFFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        {error.hasError && <ErrorMessage>{error.message}</ErrorMessage>}
        <List>
          {repositories.map((repository, index) => (
            <li key={index}>
              <span>{repository}</span>
              <Link to={`/repository/${encodeURIComponent(repository)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
