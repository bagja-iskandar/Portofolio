/**
 * @file project.repository.ts
 * @description In-memory Clean Architecture Repository for Project Entities
 */

import type { CanvasEnvironment, IProjectRepository, Project } from '../../types/duality';
import { SELECTED_PROJECTS } from '../content/projects.data';

export class ProjectRepository implements IProjectRepository {
  private readonly projects: ReadonlyArray<Project> = SELECTED_PROJECTS;

  public async getAllProjects(): Promise<ReadonlyArray<Project>> {
    return this.projects;
  }

  public async getFeaturedProjects(): Promise<ReadonlyArray<Project>> {
    return this.projects
      .filter((project) => project.featured)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public async getProjectBySlug(slug: string): Promise<Project | null> {
    const found = this.projects.find((project) => project.slug === slug);
    return found ?? null;
  }

  public async getProjectsByCanvas(canvas: CanvasEnvironment): Promise<ReadonlyArray<Project>> {
    return this.projects.filter((project) => project.canvasEnvironment === canvas);
  }
}

export const projectRepository = new ProjectRepository();
