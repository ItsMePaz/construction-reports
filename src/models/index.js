// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PersonInCharge, ProjectManager, Report } = initSchema(schema);

export {
  PersonInCharge,
  ProjectManager,
  Report
};