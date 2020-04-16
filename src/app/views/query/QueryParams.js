import { QueryBuilder } from './Query';

const defaultParams = {
  queryString: null,
  marker: null,
  hasSRAAccessions: false,
  isMappable: false,
  hasCoordinateUncertaintyInMeters: false,
  hasPermitInfo: false,
  genus: null,
  locality: null,
  family: null,
  phylum: null,
  specificEpithet: null,
  country: null,
  fromYear: null,
  toYear: null,
  bounds: null,
  materialSampleID: null,
};

export default class QueryParams {
  constructor() {
    this.projects = [];
    this.expeditions = [];
    this.filters = [];
    Object.assign(this, defaultParams);
  }

  buildQuery(selectEntities, source) {
    const builder = new QueryBuilder();

    if (this.projects.length > 0) {
      builder.add(`_projects_:${this.projects.map(p => p.projectId)}`);
    }

    if (this.expeditions.length > 0) {
      if (builder.queryString.length > 0) {
        builder.add('and');
      }
      builder.add(
        `_expeditions_:[${this.expeditions.map(e => e.expeditionCode)}]`,
      );
    }

    this.filters.forEach(filter => {
      if (filter.value || filter.type === 'has') {
        if (builder.queryString.length > 0) {
          builder.add('and');
        }

        switch (filter.type) {
          case 'has':
            builder.add(`_exists_:${filter.column}`);
            break;
          case 'fuzzy':
            builder.add(`${filter.column}:${filter.value}`);
            break;
          case 'like':
            if (filter.value.includes('%'))
              builder.add(`${filter.column}::"${filter.value}"`);
            else builder.add(`${filter.column}::"%${filter.value}%"`);
            break;
          case '<':
          case '<=':
          case '>':
          case '>=':
            builder.add(`${filter.column} ${filter.type} ${filter.value}`);
            break;
          default:
            builder.add(`${filter.column} ${filter.type} "${filter.value}"`);
        }
      }
    });

    if (this.queryString) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(this.queryString);
    }

    if (this.marker) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`fastaSequence.marker = "${this.marker}"`);
    }

    if (this.hasSRAAccessions) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add('_exists_:fastqMetadata.bioSample');
    }

    if (this.country) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Event.country = "${this.country.value}"`);
    }
    if (this.materialSampleID) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Sample.materialSampleID = "${this.materialSampleID}"`);
    }

    if (this.genus) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Sample.genus = "${this.genus}"`);
    }

    if (this.locality) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Event.locality = "${this.locality}"`);
    }

    if (this.family) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Sample.family = "${this.family}"`);
    }

    if (this.phylum) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Sample.phylum = "${this.phylum.value}"`);
    }

    if (this.specificEpithet) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Sample.specificEpithet = "${this.specificEpithet}"`);
    }

    if (this.fromYear) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Event.yearCollected >= ${this.fromYear}`);
    }

    if (this.toYear) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Event.yearCollected <= ${this.toYear}`);
    }

    if (this.isMappable) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(
        '_exists_:Event.decimalLongitude and _exists_:Event.decimalLatitude',
      );
    }
    if (this.hasTissue) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add('_exists_:Tissue.tissueID');
    }
    if (this.hasSamplePhoto) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add('_exists_:Sample_Photo.photoID');
    }
    if (this.hasEventPhoto) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add('_exists_:Event_Photo.photoID');
    }

    if (this.hasCoordinateUncertaintyInMeters) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add('_exists_:Event.coordinateUncertaintyInMeters');
    }

    if (this.hasPermitInfo) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add('_exists_:Event.permitInformation');
    }
    if (this.hasFasta) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add('_exists_:fastaSequence.sequence');
    }
    if (this.diseaseDetected) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`diseaseDetected:${this.diseaseDetected.value}`);
    }
    if (this.fatal) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`fatal:${this.fatal.value}`);
    }
    if (this.diseaseTested) {
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`diseaseTested:${this.diseaseTested.value}`);
    }

    if (this.bounds) {
      const ne = this.bounds.northEast;
      const sw = this.bounds.southWest;

      if (ne.lng > sw.lng) {
        if (builder.queryString.length > 0) builder.add('and');
        builder.add(`Event.decimalLongitude >= ${sw.lng}`);
        builder.add(`and Event.decimalLongitude <= ${ne.lng}`);
      } else {
        if (builder.queryString.length > 0) builder.add('and');
        builder.add(
          `((Event.decimalLongitude >= ${
            sw.lng
          } and Event.decimalLongitude <= 180)`,
        );
        builder.add(
          `or (Event.decimalLongitude <= ${
            ne.lng
          } and Event.decimalLongitude >= -180))`,
        );
      }
      if (builder.queryString.length > 0) builder.add('and');
      builder.add(`Event.decimalLatitude <= ${ne.lat}`);
      builder.add(`and Event.decimalLatitude >= ${sw.lat}`);
    }

    if (selectEntities && selectEntities.length > 0) {
      builder.add(`_select_:[${selectEntities.join(',')}]`);
    }

    builder.setSource(source);
    return builder.build();
  }

  clear() {
    Object.assign(this, defaultParams);
    this.expeditions = [];
    this.filters = [];
  }
}
