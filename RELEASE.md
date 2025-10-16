# Release Process

This document describes how to create a new release of the YouTube Shorts Blocker extension.

## Automated Release via GitHub Actions

The repository includes a GitHub Actions workflow that automatically creates releases when you push a new tag.

### Creating a New Release

1. **Update the version in manifest.json**
   ```bash
   # Edit manifest.json and update the "version" field
   # For example, change "1.0.0" to "1.1.0"
   ```

2. **Commit the version change**
   ```bash
   git add manifest.json
   git commit -m "Bump version to 1.1.0"
   git push
   ```

3. **Create and push a version tag**
   ```bash
   # Create a tag matching the version (must start with 'v')
   git tag v1.1.0
   git push origin v1.1.0
   ```

4. **Automatic release creation**
   - The GitHub Actions workflow will automatically trigger
   - It will package the extension into a ZIP file
   - It will create a GitHub Release with:
     - Release notes
     - Installation instructions
     - The packaged extension ZIP file
   - The release will be available on the [Releases page](https://github.com/jeroensmink98/youtube-shorts-blocker/releases)

## What Gets Packaged

The workflow packages the following files into the release ZIP:
- `manifest.json`
- `background.js`
- `content.js`
- `content.css`
- `popup.html`
- `popup.js`
- `rules.json`
- `icons/` (all icon files)
- `README.md`

Documentation files (TESTING.md, ARCHITECTURE.md, SUMMARY.md) are excluded from the release package but remain available in the repository.

## Version Naming Convention

Follow [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH):
- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

Examples:
- `v1.0.0` - Initial release
- `v1.0.1` - Bug fix
- `v1.1.0` - New feature
- `v2.0.0` - Breaking change

## Workflow Details

The GitHub Actions workflow (`.github/workflows/release.yml`):
1. Triggers on tag push matching `v*` pattern
2. Checks out the code
3. Extracts version from the tag
4. Creates a ZIP file with the extension files
5. Generates release notes
6. Creates a GitHub Release with the ZIP file

## Manual Release (Alternative)

If you prefer to create releases manually:

1. **Package the extension**
   ```bash
   zip -r youtube-shorts-blocker-v1.0.0.zip \
     manifest.json \
     background.js \
     content.js \
     content.css \
     popup.html \
     popup.js \
     rules.json \
     icons/ \
     README.md
   ```

2. **Create a GitHub Release**
   - Go to the repository on GitHub
   - Click "Releases" → "Create a new release"
   - Create a new tag (e.g., `v1.0.0`)
   - Add release title and description
   - Upload the ZIP file
   - Publish the release

## Release Checklist

Before creating a release:

- [ ] Update version in `manifest.json`
- [ ] Test the extension thoroughly
- [ ] Update `README.md` if needed
- [ ] Update `CHANGELOG.md` if it exists
- [ ] Commit all changes
- [ ] Create and push version tag
- [ ] Verify the GitHub Actions workflow completes successfully
- [ ] Check the release page for the published release
- [ ] Test downloading and installing from the release

## Troubleshooting

### Workflow doesn't trigger
- Ensure the tag starts with `v` (e.g., `v1.0.0`, not `1.0.0`)
- Check that the tag was pushed to the repository: `git push origin v1.0.0`
- Verify GitHub Actions are enabled in repository settings

### Release creation fails
- Check the Actions tab in GitHub for error details
- Ensure repository has the necessary permissions
- Verify the workflow file syntax is correct

### ZIP file is missing files
- Check the `zip` command in the workflow
- Ensure all required files are listed
- Verify files exist in the repository

## Example: Creating Version 1.1.0

```bash
# 1. Update version in manifest.json
sed -i 's/"version": "1.0.0"/"version": "1.1.0"/' manifest.json

# 2. Commit the change
git add manifest.json
git commit -m "Bump version to 1.1.0"
git push

# 3. Create and push tag
git tag v1.1.0
git push origin v1.1.0

# 4. Wait for GitHub Actions to complete
# 5. Check the releases page
```

The release will be available at:
`https://github.com/jeroensmink98/youtube-shorts-blocker/releases/tag/v1.1.0`
