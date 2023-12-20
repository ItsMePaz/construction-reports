/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
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
export const createPersonInCharge = /* GraphQL */ `
  mutation CreatePersonInCharge(
    $input: CreatePersonInChargeInput!
    $condition: ModelPersonInChargeConditionInput
  ) {
    createPersonInCharge(input: $input, condition: $condition) {
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
export const updatePersonInCharge = /* GraphQL */ `
  mutation UpdatePersonInCharge(
    $input: UpdatePersonInChargeInput!
    $condition: ModelPersonInChargeConditionInput
  ) {
    updatePersonInCharge(input: $input, condition: $condition) {
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
export const deletePersonInCharge = /* GraphQL */ `
  mutation DeletePersonInCharge(
    $input: DeletePersonInChargeInput!
    $condition: ModelPersonInChargeConditionInput
  ) {
    deletePersonInCharge(input: $input, condition: $condition) {
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
export const createProjectManager = /* GraphQL */ `
  mutation CreateProjectManager(
    $input: CreateProjectManagerInput!
    $condition: ModelProjectManagerConditionInput
  ) {
    createProjectManager(input: $input, condition: $condition) {
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
export const updateProjectManager = /* GraphQL */ `
  mutation UpdateProjectManager(
    $input: UpdateProjectManagerInput!
    $condition: ModelProjectManagerConditionInput
  ) {
    updateProjectManager(input: $input, condition: $condition) {
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
export const deleteProjectManager = /* GraphQL */ `
  mutation DeleteProjectManager(
    $input: DeleteProjectManagerInput!
    $condition: ModelProjectManagerConditionInput
  ) {
    deleteProjectManager(input: $input, condition: $condition) {
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
export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
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
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
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
