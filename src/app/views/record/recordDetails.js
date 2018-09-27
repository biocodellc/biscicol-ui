const getKey = key => event => ({ text: event[key] });

export const parentRecordDetails = {
  Event: {
    eventID: event => ({ text: event.eventID, href: `/record/${event.bcid}` }),
    yearCollected: getKey('yearCollected'),
    country: getKey('country'),
    decimalLatitude: getKey('decimalLatitude'),
    decimalLongitude: getKey('decimalLongitude'),
  },
  Sample: {
    materialSampleID: sample => ({
      text: sample.materialSampleID,
      href: `/record/${sample.bcid}`,
    }),
    genus: getKey('genus'),
    specificEpithet: getKey('specificEpithet'),
  },
  Tissue: {
    tissueID: tissue => ({
      text: tissue.tissueID,
      href: `/record/${tissue.bcid}`,
    }),
    tissueType: getKey('tissueType'),
    tissueInstitution: getKey('tissueInstitution'),
  },
};

export const childRecordDetails = {
  Sample: {
    materialSampleID: sample => ({
      text: sample.materialSampleID,
      href: `/record/${sample.bcid}`,
    }),
    genus: getKey('genus'),
    specificEpithet: getKey('specificEpithet'),
  },
  Tissue: {
    tissueID: tissue => ({
      text: tissue.tissueID,
      href: `/record/${tissue.bcid}`,
    }),
    tissueType: getKey('tissueType'),
    tissueInstitution: getKey('tissueInstitution'),
  },
  fastaSequence: {
    marker: sq => ({
      text: sq.marker,
      href: `/record/${sq.bcid}`,
    }),
  },
  fastqMetadata: {
    materialSampleID: m => ({
      text: m.materialSampleID,
      href: `/record/${m.bcid}`,
    }),
  },
  Sample_Photo: {
    photoID: p => ({
      text: p.photoID,
      href: `/record/${p.bcid}`,
    }),
    qualityScore: getKey('qualityScore'),
    hasScale: getKey('hasScale'),
  },
  Event_Photo: {
    photoID: p => ({
      text: p.photoID,
      href: `/record/${p.bcid}`,
    }),
    qualityScore: getKey('qualityScore'),
    hasScale: getKey('hasScale'),
  },
};

export const mainRecordDetails = {
  Event: {
    eventID: getKey('eventID'),
    yearCollected: getKey('yearCollected'),
    decimalLatitude: getKey('decimalLatitude'),
    decimalLongitude: getKey('decimalLongitude'),
    locality: getKey('locality'),
    bcid: e => ({
      text: e.bcid,
      href: `https://n2t.net/${e.bcid}`,
    }),
  },
  Sample: {
    materialSampleID: getKey('materialSampleID'),
    genus: getKey('genus'),
    specificEpithet: getKey('specificEpithet'),
    bcid: s => ({
      text: s.bcid,
      href: `https://n2t.net/${s.bcid}`,
    }),
  },
  Tissue: {
    tissueID: getKey('tissueID'),
    tissueType: getKey('tissueType'),
    tissuePlate: getKey('tissuePlate'),
    tissueWell: getKey('tissueWell'),
    bcid: t => ({
      text: t.bcid,
      href: `https://n2t.net/${t.bcid}`,
    }),
  },
  fastaSequence: {
    marker: getKey('marker'),
    sequence: getKey('sequence'),
    bcid: s => ({
      text: s.bcid,
      href: `https://n2t.net/${s.bcid}`,
    }),
  },
  fastqMetadata: {
    materialSampleID: getKey('materialSampleID'),
    bioSamplesLink: m => ({
      text: m.bioSample ? 'NCBI BioSamples' : undefined,
      href: m.bioSample
        ? `https://www.ncbi.nlm.nih.gov/bioproject/${m.bioSample.bioProjectId}`
        : undefined,
    }),
    bioProjectLink: m => ({
      text: m.bioSample ? 'NCBI BioProject' : undefined,
      href: m.bioSample
        ? `https://www.ncbi.nlm.nih.gov/biosample?LinkName=bioproject_biosample_all&from_uid=${
            m.bioSample.bioProjectId
          }`
        : undefined,
    }),
    bcid: s => ({
      text: s.bcid,
      href: `https://n2t.net/${s.bcid}`,
    }),
  },
};
