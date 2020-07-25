import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaGithubAlt, FaSignOutAlt, FaLink } from 'react-icons/fa';

import IssueState from './components/IssueState';

import {
  Loading,
  Owner,
  Divider,
  Project,
  GoBackButton,
  IssuesList,
} from './styles';
import Container from '../../components/Container';

import api from '../../services/api';

export default class Repository extends Component {
  constructor() {
    super();

    this.state = {
      repoName: '',
      repository: {},
      issues: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?state=all`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repoName,
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repoName, repository, issues, loading } = this.state;

    if (loading) {
      return (
        <Loading loading={loading}>
          <FaSpinner />
        </Loading>
      );
    }

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          {repoName}
        </h1>
        <Divider />
        <Owner>
          <Project>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
          </Project>
          <p>{repository.description}</p>
          <GoBackButton to="/">
            <FaSignOutAlt /> VOLTAR
          </GoBackButton>
        </Owner>
        <Divider />
        <IssuesList>
          {issues.map((issue) => (
            <li key={issue.id}>
              <span>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <h3>{issue.user.login}</h3>
                <IssueState isOpen={issue.state === 'open'} />
              </span>
              <Divider />
              <div>
                <h5>{issue.title}</h5>
                <h6>{issue.body}</h6>
                <span>
                  <a href={issue.html_url}>
                    <FaLink /> ISSUE LINK
                  </a>
                </span>
              </div>
            </li>
          ))}
        </IssuesList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
