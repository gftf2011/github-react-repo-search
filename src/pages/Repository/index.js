import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaGithubAlt, FaSignOutAlt, FaLink } from 'react-icons/fa';

import IssueState from './components/IssueState';
import IssuesFilter from './components/IssuesFilter';

import {
  Loading,
  Owner,
  Divider,
  Project,
  GoBackButton,
  IssuesList,
} from './styles';
import Container from '../../components/Container';
import Pagination from '../../components/Pagination';

import api from '../../services/api';

export default class Repository extends Component {
  constructor() {
    super();

    this.state = {
      repoName: '',
      repository: {},
      issues: [],
      issueState: 'all',
      issuesNumber: 0,
      loading: true,
      page: 1,
      offset: 5,
    };
  }

  async componentDidMount() {
    const { page, offset, issuesState } = this.state;
    const { match } = this.props;

    const { repository } = match.params;

    const repoName = decodeURIComponent(repository);

    const [repo, issuesNumber, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          markdown: true,
          state: issuesState,
          page,
          per_page: offset,
        },
      }),
    ]);

    this.setState({
      repoName,
      repository: repo.data,
      issues: issues.data,
      issuesNumber: issuesNumber.data.length,
      loading: false,
    });
  }

  handlePageChange = async (page) => {
    this.setState({ page, loading: true, issues: [] });

    const { offset, repoName, issueState } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        markdown: true,
        state: issueState,
        page,
        per_page: offset,
      },
    });

    this.setState({ loading: false, issues: issues.data });
  };

  handleIssuesStateChange = async (issueState) => {
    this.setState({ page: 1, issueState, loading: true, issues: [] });

    const { page, offset, repoName } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        markdown: true,
        state: issueState,
        page,
        per_page: offset,
      },
    });

    this.setState({ loading: false, issues: issues.data });
  };

  render() {
    const {
      repoName,
      repository,
      issues,
      issuesNumber,
      loading,
      page,
      offset,
    } = this.state;

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
        <IssuesFilter func={this.handleIssuesStateChange} />
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
        <Pagination
          page={page}
          totalItems={issuesNumber}
          offset={offset}
          func={this.handlePageChange}
        />
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.number,
      repository: PropTypes.string,
    }),
  }).isRequired,
};
