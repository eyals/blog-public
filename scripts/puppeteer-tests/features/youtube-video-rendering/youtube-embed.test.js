const puppeteer = require('puppeteer');

describe('YouTube Video Embedding', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('YouTube video should render as iframe embed on VR modeling post', async () => {
    // Navigate to the VR modeling post
    await page.goto('http://localhost:3000/experiment-accurate-modelling-in-vr');
    
    // Wait for the page to load
    await page.waitForSelector('article');
    
    // Check that YouTube iframe exists
    const youtubeIframe = await page.$('iframe[src*="youtube.com/embed"]');
    expect(youtubeIframe).toBeTruthy();
    
    // Verify the iframe has correct attributes
    const iframeSrc = await page.evaluate(iframe => iframe.src, youtubeIframe);
    expect(iframeSrc).toMatch(/https:\/\/www\.youtube\.com\/embed\/yi9xG76nbUo/);
    
    // Verify responsive wrapper
    const wrapper = await page.$('div.aspect-\\[16\\/9\\]');
    expect(wrapper).toBeTruthy();
    
    // Verify iframe has proper attributes
    const allowFullscreen = await page.evaluate(iframe => iframe.allowFullscreen, youtubeIframe);
    expect(allowFullscreen).toBe(true);
    
    const frameBorder = await page.evaluate(iframe => iframe.frameBorder, youtubeIframe);
    expect(frameBorder).toBe('0');
  });

  test('YouTube syntax should not appear as plain text', async () => {
    await page.goto('http://localhost:3000/experiment-accurate-modelling-in-vr');
    await page.waitForSelector('article');
    
    // Check that YouTube syntax is not present as text
    const content = await page.content();
    expect(content).not.toMatch(/:::youtube\{id=/);
  });

  test('YouTube iframe should have proper security attributes', async () => {
    await page.goto('http://localhost:3000/experiment-accurate-modelling-in-vr');
    await page.waitForSelector('iframe[src*="youtube.com/embed"]');
    
    const iframe = await page.$('iframe[src*="youtube.com/embed"]');
    
    // Check referrerpolicy
    const referrerPolicy = await page.evaluate(iframe => iframe.referrerPolicy, iframe);
    expect(referrerPolicy).toBe('strict-origin-when-cross-origin');
    
    // Check allow attribute contains expected permissions
    const allowAttr = await page.evaluate(iframe => iframe.getAttribute('allow'), iframe);
    expect(allowAttr).toContain('accelerometer');
    expect(allowAttr).toContain('autoplay');
    expect(allowAttr).toContain('encrypted-media');
    expect(allowAttr).toContain('gyroscope');
    expect(allowAttr).toContain('picture-in-picture');
  });
});