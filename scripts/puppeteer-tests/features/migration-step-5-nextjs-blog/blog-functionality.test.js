const puppeteer = require('puppeteer');
const path = require('path');

describe('Blog Functionality Tests', () => {
  let browser;
  let page;
  
  beforeAll(async () => {
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    // Assuming the static build is served on localhost:3000
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  });

  test('Homepage loads successfully', async () => {
    expect(page.url()).toBe('http://localhost:3000/');
    
    // Check for main elements
    const logo = await page.$('img[alt="Overtink Logo"]');
    expect(logo).toBeTruthy();
    
    const mainHeading = await page.$('h1');
    expect(mainHeading).toBeTruthy();
    
    const headingText = await page.$eval('h1', el => el.textContent);
    expect(headingText).toContain('The Restless');
    expect(headingText).toContain('Impatient');
    expect(headingText).toContain('Eyal Shahar');
  });

  test('Blog posts are displayed on homepage', async () => {
    const articles = await page.$$('article');
    expect(articles.length).toBeGreaterThan(0);
    
    // Check each article has required elements
    for (let article of articles) {
      const title = await article.$('h2');
      expect(title).toBeTruthy();
      
      const time = await article.$('time');
      expect(time).toBeTruthy();
      
      const link = await article.$('a');
      expect(link).toBeTruthy();
    }
  });

  test('Font loading - Space Grotesk is applied', async () => {
    // Wait for fonts to load
    await page.waitForTimeout(2000);
    
    const h1FontFamily = await page.$eval('h1', el => 
      window.getComputedStyle(el).fontFamily
    );
    
    expect(h1FontFamily).toContain('Space Grotesk');
  });

  test('Font loading - JetBrains Mono is applied', async () => {
    await page.waitForTimeout(2000);
    
    const bodyFontFamily = await page.$eval('body', el => 
      window.getComputedStyle(el).fontFamily
    );
    
    expect(bodyFontFamily).toContain('JetBrains Mono');
  });

  test('Individual post page loads correctly', async () => {
    // Click on first post
    const firstPostLink = await page.$('article a');
    const postUrl = await page.$eval('article a', el => el.href);
    
    await firstPostLink.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    // Check we're on a post page
    expect(page.url()).toBe(postUrl);
    
    // Check for post elements
    const postTitle = await page.$('h1');
    expect(postTitle).toBeTruthy();
    
    const authorInfo = await page.textContent('div:has-text("By Eyal Shahar")');
    expect(authorInfo).toContain('Eyal Shahar');
    
    const content = await page.$('.prose');
    expect(content).toBeTruthy();
  });

  test('Logo links back to homepage', async () => {
    // Go to a post page first
    await page.click('article a');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    // Click logo to go back
    await page.click('img[alt="Overtink Logo"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    expect(page.url()).toBe('http://localhost:3000/');
  });

  test('SEO meta tags are present', async () => {
    // Check for essential meta tags
    const title = await page.$eval('title', el => el.textContent);
    expect(title).toContain('Overtink');
    
    const description = await page.$('meta[name="description"]');
    expect(description).toBeTruthy();
    
    const ogTitle = await page.$('meta[property="og:title"]');
    expect(ogTitle).toBeTruthy();
    
    const twitterCard = await page.$('meta[name="twitter:card"]');
    expect(twitterCard).toBeTruthy();
  });

  test('Images load correctly', async () => {
    const logo = await page.$('img[alt="Overtink Logo"]');
    const logoLoaded = await page.$eval('img[alt="Overtink Logo"]', 
      img => img.complete && img.naturalHeight !== 0
    );
    expect(logoLoaded).toBe(true);
    
    // Check post images if they exist
    const postImages = await page.$$('article img');
    if (postImages.length > 0) {
      for (let img of postImages) {
        const loaded = await page.evaluate(img => 
          img.complete && img.naturalHeight !== 0, img
        );
        expect(loaded).toBe(true);
      }
    }
  });

  test('Responsive design works', async () => {
    // Test mobile viewport
    await page.setViewport({ width: 375, height: 667 });
    await page.reload({ waitUntil: 'networkidle0' });
    
    const logo = await page.$('img[alt="Overtink Logo"]');
    expect(logo).toBeTruthy();
    
    // Test desktop viewport
    await page.setViewport({ width: 1200, height: 800 });
    await page.reload({ waitUntil: 'networkidle0' });
    
    const logoDesktop = await page.$('img[alt="Overtink Logo"]');
    expect(logoDesktop).toBeTruthy();
  });

  test('404 page works', async () => {
    await page.goto('http://localhost:3000/non-existent-page', 
      { waitUntil: 'networkidle0' }
    );
    
    const heading = await page.$eval('h1', el => el.textContent);
    expect(heading).toContain('404');
    
    const homeLink = await page.$('a[href="/"]');
    expect(homeLink).toBeTruthy();
  });
});