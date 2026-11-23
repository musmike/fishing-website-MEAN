const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

describe('Frontend Configuration & Architecture Tests (Angular / MEAN)', () => {
  const frontendDir = path.join(__dirname, '..');

  it('should have valid angular.json configuration', () => {
    const raw = fs.readFileSync(path.join(frontendDir, 'angular.json'), 'utf8');
    const config = JSON.parse(raw);
    assert.ok(config.projects.frontend, 'Frontend project must be defined in angular.json');
    assert.strictEqual(config.projects.frontend.projectType, 'application');
  });

  it('should configure apiUrl in environment.ts', () => {
    const envPath = path.join(frontendDir, 'src/environments/environment.ts');
    assert.ok(fs.existsSync(envPath), 'environment.ts must exist');
    const content = fs.readFileSync(envPath, 'utf8');
    assert.ok(content.includes('apiUrl:'), 'apiUrl must be defined');
    assert.ok(content.includes('http://localhost:5000'), 'apiUrl should point to backend');
  });

  it('should have all key components defined', () => {
    const components = ['navbar', 'footer', 'home', 'post', 'reviews', 'login', 'register', 'about', 'contact', 'profile'];
    for (const comp of components) {
      const compPath = path.join(frontendDir, `src/app/components/${comp}`);
      assert.ok(fs.existsSync(compPath), `Component ${comp} should exist in src/app/components/`);
    }
  });

  it('should have app routing configuration', () => {
    const routesPath = path.join(frontendDir, 'src/app/app.routes.ts');
    assert.ok(fs.existsSync(routesPath), 'app.routes.ts must exist');
    const content = fs.readFileSync(routesPath, 'utf8');
    assert.ok(content.includes('Routes'), 'Should export Routes array');
  });
});
