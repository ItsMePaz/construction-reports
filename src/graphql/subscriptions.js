/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePersonInCharge = /* GraphQL */ `
  subscription OnCreatePersonInCharge(
    $filter: ModelSubscriptionPersonInChargeFilterInput
  ) {
    onCreatePersonInCharge(filter: $filter) {
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
export const onUpdatePersonInCharge = /* GraphQL */ `
  subscription OnUpdatePersonInCharge(
    $filter: ModelSubscriptionPersonInChargeFilterInput
  ) {
    onUpdatePersonInCharge(filter: $filter) {
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
export const onDeletePersonInCharge = /* GraphQL */ `
  subscription OnDeletePersonInCharge(
    $filter: ModelSubscriptionPersonInChargeFilterInput
  ) {
    onDeletePersonInCharge(filter: $filter) {
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
export const onCreateProjectManager = /* GraphQL */ `
  subscription OnCreateProjectManager(
    $filter: ModelSubscriptionProjectManagerFilterInput
  ) {
    onCreateProjectManager(filter: $filter) {
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
export const onUpdateProjectManager = /* GraphQL */ `
  subscription OnUpdateProjectManager(
    $filter: ModelSubscriptionProjectManagerFilterInput
  ) {
    onUpdateProjectManager(filter: $filter) {
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
export const onDeleteProjectManager = /* GraphQL */ `
  subscription OnDeleteProjectManager(
    $filter: ModelSubscriptionProjectManagerFilterInput
  ) {
    onDeleteProjectManager(filter: $filter) {
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
export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport($filter: ModelSubscriptionReportFilterInput) {
    onCreateReport(filter: $filter) {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport($filter: ModelSubscriptionReportFilterInput) {
    onUpdateReport(filter: $filter) {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport($filter: ModelSubscriptionReportFilterInput) {
    onDeleteReport(filter: $filter) {
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
