import {regionsFor} from './relationships.mjs';

// Search the same records the reader and studio use, including authored metadata.
export function searchText(entry, catalog) {
  const related = [...entry.relatedEntryIds, ...entry.requirements.entryIds,
    ...entry.methods.flatMap(method => method.requirements.entryIds)];
  const values = [entry, ...regionsFor(entry, catalog).map(id => catalog.regions.find(r => r.id === id)?.name),
    ...entry.subsectionIds.map(id => catalog.subsections.find(s => s.id === id)?.name),
    ...related.map(id => catalog.entries.find(e => e.id === id)?.title),
    ...[...new Set([...entry.mediaIds, ...entry.methods.flatMap(m => m.mediaIds)])].map(id => catalog.videos.find(v => v.id === id))];
  const strings = [];
  const collect = value => {
    if (typeof value === 'string') strings.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  };
  values.forEach(collect);
  return strings.join(' ').toLocaleLowerCase();
}

export function matchesSearch(entry, catalog, query) {
  const text = searchText(entry, catalog);
  return query.trim().toLocaleLowerCase().split(/\s+/).every(word => text.includes(word));
}
