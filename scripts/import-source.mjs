import fs from 'node:fs';
import crypto from 'node:crypto';
const source=JSON.parse(fs.readFileSync('content/source-snapshot.json','utf8'));
const names=['Squid Coast','Brave Haven','Honeycomb Fields','Howling Woods','Rainy Plains','Frozen Highlands',"Singer's Meadow",'Humbler Huskland','Lullaby Hills','Illager Stronghold'];
const regions=names.map(name=>({id:name.toLowerCase().replace(/[^a-z0-9]+/g,'-'),name}));
const assignments={'MCD2-009':['brave-haven'],'MCD2-014':['illager-stronghold'],'MCD2-015':['honeycomb-fields'],'MCD2-017':['howling-woods'],'MCD2-026':['illager-stronghold']};
const locationNames={'MCD2-002':['Ichor Tower','Orange Tower','Red Tower'],'MCD2-006':['Frozen Fortress'],'MCD2-007':["Archie's Ruins"],'MCD2-008':['Sift'],'MCD2-009':["Woodcutter’s Outpost",'Puddle Pond','Ichor Tower','Shipwreck',"Archie's Ruins",'Frozen Fortress'],'MCD2-010':['Spider Cave'],'MCD2-012':['Orange Tower'],'MCD2-013':['Ichor Tower'],'MCD2-016':['Spider Cave'],'MCD2-018':['Deep Dark'],'MCD2-019':['Deep Dark'],'MCD2-023':['Frozen Fortress'],'MCD2-024':['Frozen Fortress'],'MCD2-025':['Sculk Music Door'],'MCD2-028':['Final Souldown'],'MCD2-033':['Frozen Fortress'],'MCD2-034':['Powered Door']};
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-');
const subs=[...new Set(Object.values(locationNames).flat())].map(name=>({id:slug(name),name,regionId:null,image:null,status:'Location to confirm'}));
for(const r of source.entries.values.slice(1).filter(r=>r[0])){
 const [id,title,category,credit,date,instructions,notes='',videoCount]=r;
 const vids=source.videos.values.slice(1).filter(v=>v[1]===id).map(v=>v[0]);
 const entry={id,title,aliases:[],summary:'',type:category==='Movement'?'tech':id==='MCD2-005'?'reference':category==='Boss strategy'?'strategy':category==='Exploration'?'reference':'skip',originalCategory:category,regionIds:assignments[id]||[],subsectionIds:(locationNames[id]||[]).map(slug),locationStatus:category==='Movement'||id==='MCD2-005'?'general':assignments[id]?'partially-confirmed':'unassigned',instructions,notes,credits:{discovery:credit,refinement:id==='MCD2-001'?'John Sézchavèire (roll timing)':'',footage:'',narration:''},discoveryDate:new Date(Date.UTC(1899,11,30)+date*86400000).toISOString().slice(0,10),editorialDate:null,retestDate:null,requirements:{mode:'all',entryIds:[],equipment:[],quests:[]},applicability:'Unknown — see source caveats',usefulness:'Unknown',evidenceStatus:'Imported source; not independently retested',warnings:[],mediaIds:vids,methods:[{id:id+'-method-1',title:'Imported method',instructions,requirements:{mode:'all',entryIds:[],equipment:[],quests:[]},applicability:'Unknown — see source caveats',credits:'',mediaIds:vids}],legacy:{dateSerial:date,expectedVideoCount:videoCount}};
 fs.writeFileSync('content/entries/'+id+'.json',JSON.stringify(entry,null,2)+'\n');
}
const videos=source.videos.values.slice(1).filter(r=>r[0]).map(([id,entryId,title,sourceType,url])=>({id,entryId,title,sourceType,url,role:id==='VID-046'?'Input setup':/Demo [234]/.test(title)||id==='VID-044'?'Alternative method':'Original proof',credits:''}));
const revision='sheet-'+crypto.createHash('sha256').update(JSON.stringify({entries:source.entries.values,videos:source.videos.values})).digest('hex').slice(0,16);
for(const [name,data] of Object.entries({regions,subsections:subs,videos,meta:{schemaVersion:1,revision,sourceUrl:source.metadata.spreadsheetUrl,importedAt:source.readAt,sourceEntries:35,sourceVideos:46}}))fs.writeFileSync('content/'+name+'.json',JSON.stringify(data,null,2)+'\n');
fs.writeFileSync('content/routes/any-percent.json',JSON.stringify({id:'any-percent',title:'Any%',status:'Draft — awaiting approved route',sample:false,dependencyReviewed:false,gameplayTested:false,stages:[]},null,2)+'\n');
