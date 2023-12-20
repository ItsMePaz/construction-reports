/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPersonInCharge = /* GraphQL */ `
  query GetPersonInCharge($id: ID!) {
    getPersonInCharge(id: $id) {
      id
      given_name
      last_name
      middle_name
      is_active
      profile_picture
      preferred_username
      email
      projectManagers {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPersonInCharges = /* GraphQL */ `
  query ListPersonInCharges(
    $filter: ModelPersonInChargeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersonInCharges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        given_name
        last_name
        middle_name
        is_active
        profile_picture
        preferred_username
        email
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProjectManager = /* GraphQL */ `
  query GetProjectManager($id: ID!) {
    getProjectManager(id: $id) {
      id
      given_name
      last_name
      middle_name
      preferred_username
      email
      is_active
      profile_picture
      personInCharge {
        id
        given_name
        last_name
        middle_name
        is_active
        profile_picture
        preferred_username
        email
        createdAt
        updatedAt
        __typename
      }
      report {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      personInChargeProjectManagersId
      __typename
    }
  }
`;
export const listProjectManagers = /* GraphQL */ `
  query ListProjectManagers(
    $filter: ModelProjectManagerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectManagers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        given_name
        last_name
        middle_name
        preferred_username
        email
        is_active
        profile_picture
        createdAt
        updatedAt
        personInChargeProjectManagersId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      projectManager {
        id
        given_name
        last_name
        middle_name
        preferred_username
        email
        is_active
        profile_picture
        createdAt
        updatedAt
        personInChargeProjectManagersId
        __typename
      }
      title
      description
      images
      createdAt
      updatedAt
      projectManagerReportId
      __typename
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        images
        createdAt
        updatedAt
        projectManagerReportId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
