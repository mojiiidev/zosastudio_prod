# Carbon Fields Migration Guide

Your WordPress theme has been updated to use Carbon Fields instead of Advanced Custom Fields (ACF). Carbon Fields provides free repeater/complex fields without requiring a paid license.

## Required Plugins

Install these 4 free plugins in your WordPress admin:

### 1. WPGraphQL
- Go to: wp-admin > Plugins > Add New
- Search: "WPGraphQL"
- Install the plugin by Jason Bahl
- Activate it

### 2. Custom Post Type UI (CPT UI)
- Go to: wp-admin > Plugins > Add New
- Search: "Custom Post Type UI"
- Install the plugin by WebDevStudios
- Activate it
- Note: The Partners post type is already registered in your theme's functions.php, so you don't need to create it manually unless you prefer using the UI.

### 3. Carbon Fields
- Go to: wp-admin > Plugins > Add New
- Search: "Carbon Fields"
- Install the plugin by htmlburger
- Activate it

### 4. WPGraphQL for Carbon Fields
- Download: https://github.com/wp-graphql/wp-graphql-for-carbon-fields/releases
- Download the latest release ZIP file
- Go to: wp-admin > Plugins > Add New > Upload Plugin
- Upload the ZIP file
- Activate it

## Migration Steps

### Step 1: Remove ACF Plugins (if installed)
1. Deactivate "Advanced Custom Fields" plugin
2. Deactivate "WPGraphQL for ACF" plugin
3. You can delete them if you're not using them elsewhere

### Step 2: Install Carbon Fields Plugins
Follow the installation instructions above for all 4 required plugins.

### Step 3: Upload Updated Theme
1. Upload the updated `wordpress-bridge-theme` folder to your WordPress installation
2. Go to: wp-admin > Appearance > Themes
3. Activate "Zosa Law Bridge Theme"

### Step 4: Verify Field Registration
1. Go to: wp-admin > Partners > Add New
2. You should see a "Partner Details" meta box with the following fields:
   - Title / Position
   - Role
   - Bio
   - Email
   - Phone
   - Photo
   - Education (repeatable)
   - Specializations (repeatable)

### Step 5: Migrate Existing Data (if you had ACF data)
If you previously had partner data in ACF format, you'll need to manually re-enter it into the Carbon Fields format, or write a custom migration script. The field names are similar, so the data structure should map directly.

## Key Differences from ACF

### Field Structure
- **ACF**: Used nested field groups with `partnerFields { photo { node { sourceUrl } } }`
- **Carbon Fields**: Returns direct values with `partnerFields { photo }` (direct URL string)

### Repeater Fields
- **ACF**: Called "Repeater" fields (Pro only)
- **Carbon Fields**: Called "Complex" fields (FREE!)

### Image Fields
- **ACF**: Returns nested object with URL
- **Carbon Fields**: Returns direct URL string when using `set_value_type('url')`

## GraphQL Query Structure

Your GraphQL query now looks like this:

```graphql
query GetPartners {
  partners(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      id
      title
      partnerFields {
        title
        role
        bio
        email
        phone
        photo
        education {
          degree
        }
        specializations {
          name
        }
      }
    }
  }
}
```

## Testing Your Setup

1. Create a test Partner post with all fields filled
2. Go to: your-wordpress-site.com/graphql
3. Run the GetPartners query above
4. Verify that all fields return data correctly
5. Check your Next.js frontend to see if the data displays correctly

## Troubleshooting

### "Carbon Fields not loading"
- Make sure Carbon Fields plugin is activated
- Check that WPGraphQL for Carbon Fields is also activated
- Clear WordPress cache if using a caching plugin

### "Fields not showing in GraphQL"
- Go to: wp-admin > GraphQL > Settings
- Verify that the Partners post type is enabled in GraphQL
- Clear GraphQL schema cache

### "Photo field returns null"
- Make sure you've uploaded an image
- Carbon Fields returns the full URL string directly
- Check that the image is not too large (WordPress media upload limits)

### "Education/Specializations empty"
- These are complex fields (repeaters)
- Click "Add" to add entries
- Make sure to save the post after adding entries

## Support

For Carbon Fields documentation, visit:
- https://carbonfields.net/docs/

For WPGraphQL documentation, visit:
- https://www.wpgraphql.com/docs/introduction

All plugins used are 100% free and open source.
