# ADR 0002: Use MongoDB over PostgreSQL

## Status
Accepted

## Context
The portfolio needs to store a small number of content types
(projects, skills, an about-me profile) with straightforward,
mostly-independent read and write patterns. A relational database
(PostgreSQL) and a document database (MongoDB) were both viable
options.

## Decision
Use MongoDB, accessed through Mongoose as the ODM (Object-Document
Mapper), with MongoDB Atlas as the hosted cluster.

## Consequences

**Positive:**
- Content like a project (title, description, image, an array of
  skill tags) maps naturally onto a single document, avoiding joins
  for what is conceptually one "thing".
- Schema flexibility is useful while the content model is still
  evolving early in the project, fields can be added to a Mongoose
  schema without a formal migration step, unlike a relational schema
  change.
- MongoDB Atlas's free tier (512MB) is more than sufficient for a
  portfolio's content volume, with no self-managed database server.
- Pairs naturally with a Node.js/Express backend (JSON in, JSON out,
  no ORM/relational mapping layer required).

**Negative:**
- No native support for enforced relational integrity (e.g. foreign
  key constraints), referential correctness between `Project` and
  `Skill` has to be enforced at the application/service layer instead
  of the database layer.
- Many-to-many relationships (Project–Skill) are less natural in a
  document database than in a relational one, and are implemented
  here as an array of references rather than a proper join table.

## Alternatives considered
- **PostgreSQL:** stronger relational guarantees and would be the
  better choice if the data model were more relational (e.g. many
  interconnected entities with strict integrity requirements). For
  this project's simple, mostly-document-shaped content, it would
  add schema-migration overhead without a corresponding benefit.
- **A flat JSON file / no database:** rejected immediately since the
  entire point of this project is a dynamically editable backend.
