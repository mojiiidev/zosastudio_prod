# Carbon Fields Migration Guide

Your WordPress theme has been updated to use Carbon Fields instead of Advanced Custom Fields (ACF). Carbon Fields provides free repeater/complex fields without requiring a paid license.

## Required Plugins

Install these 2 free plugins in your WordPress admin. That's it!

### 1. Carbon Fields
- Go to: wp-admin > Plugins > Add New
- Search: "Carbon Fields"
- Install the plugin by htmlburger
- Activate it

### 2. Custom Post Type UI (CPT UI) - Optional
- Go to: wp-admin > Plugins > Add New
- Search: "Custom Post Type UI"
- Install the plugin by WebDevStudios
- Activate it (optional - the Partners post type is already registered in your theme)

**Note:** Your Next.js frontend uses the WordPress REST API to fetch Carbon Fields data. No GraphQL or additional integration plugins are needed!

## Migration Steps

### Step 1: Remove ACF Plugins (if installed)
1. Deactivate "Advanced Custom Fields" plugin
2. Deactivate "WPGraphQL for ACF" plugin (if you have it)
3. Delete them from wp-admin > Plugins

### Step 2: Install Carbon Fields Plugin
1. Go to: wp-admin > Plugins > Add New
2. Search: "Carbon Fields"
3. Install and activate

### Step 3: Upload Updated Theme
1. Upload the updated `wordpress-bridge-theme` folder to your WordPress installation
2. Go to: wp-admin > Appearance > Themes
3. Activate "Zosa Law Bridge Theme"

### Step 4: Verify Everything Works
1. Go to: wp-admin > Partners > Add New
2. You should see a "Partner Details" meta box with these fields:
   - Title / Position
   - Role
   - Bio
   - Email
   - Phone
   - Photo
   - Education (complex/repeatable)
   - Specializations (complex/repeatable)

3. Fill in test data and save
4. Your Next.js frontend will automatically sync via REST API

### Step 5: Migrate Existing Data (if needed)
If you had partner data in ACF format, you can:
- **Option A**: Manually re-enter the data (simple if you have few partners)
- **Option B**: Write a PHP script to migrate ACF data to Carbon Fields
- **Option C**: Export ACF data to CSV, then import to Carbon Fields

## How It Works

### Without GraphQL
Previously you needed:
- Carbon Fields plugin
- WPGraphQL plugin
- WPGraphQL Carbon Fields integration plugin

### Now (Simplified)
You only need:
- Carbon Fields plugin
- Your Next.js app fetches data via REST API: `/wp-json/wp/v2/partners`

### REST API Response Example

The REST endpoint `/wp-json/wp/v2/partners` now returns:

```json
{
  "id": 1,
  "title": { "rendered": "John Doe" },
  "partner_fields": {
    "title": "Senior Partner",
    "role": "Partner",
    "bio": "John is a senior partner with 20 years of experience.",
    "email": "john@zosalaw.ph",
    "phone": "+63 (32) 231-1551",
    "photo": "https://example.com/photo.jpg",
    "education": [
      { "degree": "Bachelor of Laws, University of Santo Tomas" }
    ],
    "specializations": [
      { "name": "Corporate Law" },
      { "name": "Litigation" }
    ]
  }
}
```

## Testing Your Setup

### 1. Create Test Partner Data
1. Go to: wp-admin > Partners > Add New
2. Fill in all fields with test data
3. Save the post

### 2. Test REST API
1. Open your browser and visit: `https://your-wordpress-site.com/wp-json/wp/v2/partners`
2. You should see the partner data in JSON format
3. Verify the `partner_fields` object contains all your data

### 3. Test Frontend
1. Your Next.js frontend automatically fetches from the REST API
2. Refresh the page to see if partners appear
3. Check browser console for any errors

## Troubleshooting

### "Carbon Fields not showing in WordPress admin"
- Make sure Carbon Fields plugin is activated
- Clear WordPress cache (if using a caching plugin)
- Go to: wp-admin > Partners > Add New - should see "Partner Details" box

### "REST API returns empty partner_fields"
- Make sure you've filled in the Carbon Fields when creating a partner
- Clear any REST API caching
- Check that the partner post is published (not draft)

### "Frontend shows static data, not live data"
- Check your `NEXT_PUBLIC_WORDPRESS_URL` environment variable
- Open browser console for API errors
- Try visiting the REST endpoint directly to verify it works

### "Photo field is empty"
- Make sure you uploaded an image to the Photo field
- Carbon Fields returns the full URL string
- Check WordPress media settings

### "Education/Specializations showing as empty arrays"
- Click "Add" to add entries to complex fields
- Each entry needs at least the required fields filled
- Save the post after adding entries

## Support

For Carbon Fields documentation, visit:
- https://carbonfields.net/docs/

For WPGraphQL documentation, visit:
- https://www.wpgraphql.com/docs/introduction

All plugins used are 100% free and open source.
