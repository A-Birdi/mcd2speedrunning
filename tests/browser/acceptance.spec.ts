import {test, expect, type Page} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import JSZip from 'jszip';

const tabs = ['Tech','Squid Coast','Brave Haven','Honeycomb Fields','Howling Woods','Rainy Plains','Frozen Highlands',"Singer's Meadow",'Humbler Huskland','Lullaby Hills','Illager Stronghold','Speedrun Guides'];
const studio = (page: Page) => page.locator('main > div:not([hidden]) > section');
const route = (page: Page) => page.locator('main > section');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAC0SDtlAAAAF0lEQVR4nGMMCAhgIAUwkaR6VAOtNAAArNkBAsCIR8QAAAAASUVORK5CYII=', 'base64');

test.beforeEach(async ({page}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  (page as Page & {appErrors: string[]}).appErrors = errors;
});
test.afterEach(async ({page}) => {
  expect((page as Page & {appErrors: string[]}).appErrors).toEqual([]);
});

test('exact navigation, keyboard, narrow layout and stable deep links', async ({page}, info) => {
  await page.goto('');
  const nav = page.getByRole('navigation', {name:'Main navigation'});
  expect(await nav.getByRole('link').allTextContents()).toEqual(tabs);
  for (const label of tabs) await expect(nav.getByRole('link',{name:label,exact:true})).toBeVisible();
  await expect(nav.getByRole('link',{name:'Tech',exact:true})).toHaveAttribute('aria-current','page');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await nav.getByRole('link',{name:'Honeycomb Fields',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Honeycomb Fields',exact:true})).toBeVisible();
  await expect(page.getByRole('region',{name:'Subsection navigation'}).getByText('Screenshot pending')).toBeVisible();
  await page.reload();
  await expect(nav.getByRole('link',{name:'Honeycomb Fields',exact:true})).toHaveAttribute('aria-current','page');
  await page.goto('#/entry/MCD2-035?method=MCD2-035-method-1');
  await page.reload();
  await expect(page.getByRole('heading',{name:'Hyper Baron Slide / Hyper Baron Jump',exact:true})).toBeVisible();
  await expect(page.locator('.prose')).toContainText('Somersault');
  await page.screenshot({path:info.outputPath('entry.png'),fullPage:true});
  for (const width of [320,390,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    for (const label of tabs) await expect(nav.getByRole('link',{name:label,exact:true})).toBeVisible();
    await page.screenshot({path:info.outputPath(`shell-${width}.png`),fullPage:true});
  }
  if (info.project.name === 'touch-reduced-motion') {
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    expect(await nav.getByRole('link').first().evaluate(el => getComputedStyle(el).transitionDuration)).toBe('0s');
  }
});

test('all source records, credits, place search and lazy media remain reachable', async ({page}) => {
  await page.goto('#/all');
  await expect(page.locator('.entry-card')).toHaveCount(35);
  const search=page.getByRole('textbox',{name:'Search all discoveries'});
  await search.fill('Sézchavèire');
  await expect(page.locator('.entry-card').filter({hasText:'MCD2-001'})).toBeVisible();
  await search.fill('Honeycomb Fields');
  await expect(page.locator('.entry-card').filter({hasText:'MCD2-015'})).toBeVisible();
  await search.fill('');
  await page.goto('#/entry/MCD2-001');
  await expect(page.locator('.media-list button')).toHaveCount(4);
  await expect(page.locator('.source-link')).toHaveAttribute('href','https://discord.com/channels/716030563122675752/1554128398564065384/1554450155715952682');
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.goto('#/entry/MCD2-003');
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.getByRole('button',{name:'Load YouTube player'}).click();
  await expect(page.locator('iframe')).toHaveAttribute('src',/youtube-nocookie.com\/embed\/AUgQXbDqRDA\?start=0$/);
  await expect(page.getByRole('link',{name:'Watch on YouTube'})).toBeVisible();
  await page.goto('#/entry/MCD2-005');
  await expect(page.getByText('No dedicated video supplied')).toBeVisible();
  await page.goto('#/review');
  await expect(page.locator('.entry-card').filter({hasText:'MCD2-008'})).toBeVisible();
});

test('route choices, focus rationale, connectors and entry roundtrip', async ({page},info) => {
  await page.goto('#/guides');
  await expect(page.getByRole('heading',{name:'Actual route awaiting approved steps'})).toBeVisible();
  await page.goto('#/guides?guide=sample');
  const reader=route(page);
  await reader.getByRole('button',{name:'Horizontal chart',exact:true}).click();
  await expect(reader.locator('.alternative')).toHaveCount(3);
  await expect(reader.locator('.connectors > path')).toHaveCount(4);
  await reader.locator('.stage-card').nth(1).focus();
  await expect(reader.locator('.route-details')).toContainText('Choose one approach; the three alternatives are not three required steps.');
  await expect(reader.locator('.rationale-preview').nth(1)).toBeVisible();
  await reader.locator('.alternative').nth(1).getByRole('button').click();
  await reader.getByRole('button',{name:'Reading / checklist',exact:true}).click();
  await expect(reader.locator('.route-stage')).toHaveCount(3);
  const context=page.url();
  await reader.getByRole('link',{name:/Duck Jumps/}).first().click();
  await expect(page.getByRole('heading',{name:'Duck Jumps / Jump Tech',exact:true})).toBeVisible();
  await page.getByRole('link',{name:'Back to route guide'}).click();
  expect(page.url()).toBe(context);
  await page.reload();
  await expect(reader.locator('.alternative.selected')).toContainText('Technique option example');
  await page.screenshot({path:info.outputPath('branching-guide.png'),fullPage:true});
});

test('independent author edits export and restore exact catalog, screenshot and route data', async ({page},info) => {
  await page.goto('#/studio');
  const editor=studio(page);
  await editor.getByLabel('Summary / use case').fill('Acceptance exercise: description correction.');
  const aliases=editor.getByLabel('Aliases (one per line)');
  await aliases.fill('First alias');
  await aliases.press('End');await aliases.press('Enter');await aliases.pressSequentially('Second alias');
  await aliases.press('Tab');
  await expect(aliases).toHaveValue('First alias\nSecond alias');
  await editor.getByRole('button',{name:'Add discovery',exact:true}).click();
  await editor.getByLabel('Title',{exact:true}).fill('Acceptance discovery');
  await editor.getByLabel('Method instructions',{exact:true}).fill('Test-only local instructions.');
  await editor.getByRole('button',{name:'Media & tutorials',exact:true}).click();
  await editor.getByRole('button',{name:'Add media reference',exact:true}).click();
  await editor.getByLabel('Canonical HTTPS source URL').fill('https://youtu.be/AUgQXbDqRDA?t=80');
  await editor.getByLabel('Video title',{exact:true}).fill('Acceptance tutorial');
  await editor.getByRole('button',{name:'Subsections & screenshots',exact:true}).click();
  await editor.getByRole('button',{name:'Add subsection',exact:true}).click();
  await editor.getByLabel('Live-text subsection name').fill('Acceptance image fixture');
  await editor.getByRole('combobox',{name:'Confirmed region',exact:true}).selectOption('honeycomb-fields');
  await editor.getByLabel(/Add screenshot/).setInputFiles({name:'acceptance.png',mimeType:'image/png',buffer:png});
  await expect(editor.getByLabel('Alt text',{exact:true})).toBeVisible();
  await editor.getByLabel('Alt text',{exact:true}).fill('Test fixture, not game imagery');
  await editor.getByLabel('Screenshot credit').fill('Acceptance test');
  const assetPath=await editor.getByLabel('Final relative asset path',{exact:true}).inputValue();
  await editor.getByRole('button',{name:'Route Builder',exact:true}).click();
  await editor.getByRole('button',{name:'Load labeled example for editing'}).click();
  const step=editor.locator('.editor-panel details').nth(1);
  await step.locator('summary').click();
  await step.locator('.branch-editor').nth(0).getByRole('button',{name:'Move down',exact:true}).first().click();
  await editor.getByRole('button',{name:'Save browser draft'}).click();
  await expect(editor.locator('.status-line')).toContainText('Draft saved on this browser');
  const pending=page.waitForEvent('download');
  await editor.getByRole('button',{name:'Export changed files',exact:true}).click();
  const download=await pending;const bytes=await readFile((await download.path())!);
  const zip=await JSZip.loadAsync(bytes);const backup=JSON.parse(await zip.file('_studio/draft.json')!.async('string'));
  expect(backup.catalog.entries[0].summary).toBe('Acceptance exercise: description correction.');
  expect(backup.catalog.entries[0].aliases).toEqual(['First alias','Second alias']);
  expect(backup.catalog.entries.at(-1).title).toBe('Acceptance discovery');
  expect(backup.catalog.videos.at(-1).role).toBe('Tutorial');
  expect(backup.catalog.routes.find((r:any)=>r.id==='sample').stages[1].choices.map((c:any)=>c.id)).toEqual(['sample-tech','sample-normal','sample-multi']);
  expect(await zip.file(assetPath)!.async('nodebuffer')).toEqual(png);
  expect(await zip.file('CHANGE_SUMMARY.md')!.async('string')).toContain(assetPath);
  expect(zip.file('content/entries/MCD2-001.json')).not.toBeNull();
  await page.reload();
  await editor.getByLabel('Import draft JSON or studio ZIP').setInputFiles({name:'restore.zip',mimeType:'application/zip',buffer:bytes});
  await expect(editor.getByRole('status')).toContainText('Draft restored successfully');
  await editor.getByRole('button',{name:'Discoveries & methods',exact:true}).click();
  await expect(editor.getByLabel('Summary / use case')).toHaveValue('Acceptance exercise: description correction.');
  await editor.getByRole('button',{name:'Preview catalog',exact:true}).click();
  await expect(page.locator('.preview-banner')).toContainText('Local draft preview');
  await expect(page.locator('.entry-card').filter({hasText:'Acceptance discovery'})).toBeVisible();
  await page.goto('#/entry/MCD2-036');
  await expect(page.locator('.media-screen')).toContainText('Acceptance tutorial');
  await page.getByRole('button',{name:'Return to published content'}).click();
  await page.goto('#/all');
  await expect(page.locator('.entry-card')).toHaveCount(35);
  await page.goto('#/studio');
  await expect(editor.getByLabel('Summary / use case')).toHaveValue('Acceptance exercise: description correction.');
  const stale={...backup,baseRevision:'content-stale'};
  await editor.getByLabel('Import draft JSON or studio ZIP').setInputFiles({name:'stale.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(stale))});
  await expect(editor.getByRole('status')).toContainText('Revision conflict');
  await page.route('**/content-revision.json',r=>r.fulfill({json:{revision:'content-newer'}}));
  await editor.getByRole('button',{name:'Export changed files',exact:true}).click();
  await expect(editor.getByRole('status')).toContainText('upstream catalog changed');
  await expect(editor.getByLabel('Summary / use case')).toHaveValue('Acceptance exercise: description correction.');
  await page.screenshot({path:info.outputPath('studio.png'),fullPage:true});
});
