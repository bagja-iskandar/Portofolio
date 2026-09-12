/**
 * @file structure.repository.ts
 * @description Clean Architecture repository port & adapter for Structure View data access
 * Fully decouples UI presentation components from data fixtures.
 */

import type {
  CapabilitiesTaxonomy,
  DirectContactMeta,
  EngineeringHighlightsRollup,
  IStructureRepository,
  Project,
  StructureViewData,
  SystemsArchitectureMatrix,
} from '../../types/duality';
import { CAPABILITIES_TAXONOMY } from '../content/capabilities.data';
import { DIRECT_CONTACT_META } from '../content/direct-contact.data';
import { ENGINEERING_HIGHLIGHTS } from '../content/engineering-highlights.data';
import { SELECTED_PROJECTS } from '../content/projects.data';
import { STRUCTURE_VIEW_DATA } from '../content/structure-view.data';
import { SYSTEMS_ARCHITECTURE_MATRIX } from '../content/systems-matrix.data';

export class StructureRepository implements IStructureRepository {
  private readonly data: StructureViewData = STRUCTURE_VIEW_DATA;

  public async getStructureViewData(): Promise<StructureViewData> {
    return this.data;
  }

  public async getCapabilitiesTaxonomy(): Promise<CapabilitiesTaxonomy> {
    return CAPABILITIES_TAXONOMY;
  }

  public async getSystemsArchitectureMatrix(): Promise<SystemsArchitectureMatrix> {
    return SYSTEMS_ARCHITECTURE_MATRIX;
  }

  public async getEngineeringHighlights(): Promise<EngineeringHighlightsRollup> {
    return ENGINEERING_HIGHLIGHTS;
  }

  public async getDirectContactMeta(): Promise<DirectContactMeta> {
    return DIRECT_CONTACT_META;
  }

  public async getProjectsSummary(): Promise<ReadonlyArray<Project>> {
    return SELECTED_PROJECTS;
  }
}

export const structureRepository = new StructureRepository();
