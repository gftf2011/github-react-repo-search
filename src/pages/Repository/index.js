import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaGithubAlt } from 'react-icons/fa';

import { Loading } from './styles';
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
      api.get(`/repos/${repoName}/issues`, {
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
