/**
 * @file index.ts
 * @description Centralized entry point for Data Layer content and repositories
 * Strictly complies with §38 and §39 of PROJECT_BIBLE.md.
 */

// Canonical Content Fixtures
export * from './content/chapters.data';
export * from './content/threshold.data';
export * from './content/projects.data';
export * from './content/capabilities.data';
export * from './content/systems-matrix.data';
export * from './content/engineering-highlights.data';
export * from './content/work-experience.data';
export * from './content/direct-contact.data';
export * from './content/structure-view.data';

// Clean Architecture Repositories
export * from './repositories/project.repository';
export * from './repositories/structure.repository';
