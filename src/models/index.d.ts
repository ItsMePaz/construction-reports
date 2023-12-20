import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerPersonInCharge = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonInCharge, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly given_name: string;
  readonly last_name: string;
  readonly middle_name: string;
  readonly preferred_username: string;
  readonly email: string;
  readonly projectManagers?: (ProjectManager | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPersonInCharge = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PersonInCharge, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly given_name: string;
  readonly last_name: string;
  readonly middle_name: string;
  readonly preferred_username: string;
  readonly email: string;
  readonly projectManagers: AsyncCollection<ProjectManager>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PersonInCharge = LazyLoading extends LazyLoadingDisabled ? EagerPersonInCharge : LazyPersonInCharge

export declare const PersonInCharge: (new (init: ModelInit<PersonInCharge>) => PersonInCharge) & {
  copyOf(source: PersonInCharge, mutator: (draft: MutableModel<PersonInCharge>) => MutableModel<PersonInCharge> | void): PersonInCharge;
}

type EagerProjectManager = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProjectManager, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly given_name: string;
  readonly last_name: string;
  readonly middle_name: string;
  readonly preferred_username: string;
  readonly email: string;
  readonly personInCharge?: PersonInCharge | null;
  readonly report?: (Report | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly personInChargeProjectManagersId?: string | null;
}

type LazyProjectManager = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProjectManager, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly given_name: string;
  readonly last_name: string;
  readonly middle_name: string;
  readonly preferred_username: string;
  readonly email: string;
  readonly personInCharge: AsyncItem<PersonInCharge | undefined>;
  readonly report: AsyncCollection<Report>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly personInChargeProjectManagersId?: string | null;
}

export declare type ProjectManager = LazyLoading extends LazyLoadingDisabled ? EagerProjectManager : LazyProjectManager

export declare const ProjectManager: (new (init: ModelInit<ProjectManager>) => ProjectManager) & {
  copyOf(source: ProjectManager, mutator: (draft: MutableModel<ProjectManager>) => MutableModel<ProjectManager> | void): ProjectManager;
}

type EagerReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly projectManager?: ProjectManager | null;
  readonly taskDscription: string;
  readonly imageReport: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly projectManagerReportId?: string | null;
}

type LazyReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly projectManager: AsyncItem<ProjectManager | undefined>;
  readonly taskDscription: string;
  readonly imageReport: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly projectManagerReportId?: string | null;
}

export declare type Report = LazyLoading extends LazyLoadingDisabled ? EagerReport : LazyReport

export declare const Report: (new (init: ModelInit<Report>) => Report) & {
  copyOf(source: Report, mutator: (draft: MutableModel<Report>) => MutableModel<Report> | void): Report;
}