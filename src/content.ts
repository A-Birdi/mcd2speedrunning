import meta from '../content/meta.json';
import regions from '../content/regions.json';
import subsections from '../content/subsections.json';
import videos from '../content/videos.json';
import any from '../content/routes/any-percent.json';
import type {Catalog} from './types';
const records=import.meta.glob('../content/entries/*.json',{eager:true,import:'default'});
export const published={meta,regions,subsections,videos,entries:Object.values(records).sort((a:any,b:any)=>a.id.localeCompare(b.id)),routes:[any]} as Catalog;
