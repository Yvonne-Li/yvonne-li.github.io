#!/bin/bash

# Jekyll Project Cleanup Script
# Run this from your project root directory

echo "🧹 Starting Jekyll project cleanup..."

# 1. Remove generated files (will be regenerated on build)
echo "Removing generated files..."
rm -rf _site/
rm -rf .jekyll-cache/
rm -rf .sass-cache/
rm -rf .jekyll-metadata

# 2. Remove entire backend folder (you have a separate repo for this)
echo "Removing backend folder (duplicate of separate repo)..."
rm -rf backend/

# 3. Remove duplicate gem installations (website/ is redundant)
echo "Removing duplicate gem installations..."
rm -rf website/

# 4. Remove system files
echo "Removing system files..."
find . -name ".DS_Store" -delete 2>/dev/null || true

# 5. Remove project structure file
echo "Removing project structure file..."
rm -f project_structure.txt

# 6. Clean assets directory and remove unused chat files
echo "Cleaning assets directory..."
rm -f assets/.DS_Store
if [ -f "assets/js/_no_use_chat.js" ]; then
    echo "Removing unused chat JavaScript file..."
    rm assets/js/_no_use_chat.js
fi

# 7. Check if puns.js is also unused (since backend is removed)
if [ -f "assets/js/puns.js" ]; then
    echo "⚠️  Found assets/js/puns.js - may be unused since backend was removed"
    echo "   If you don't have a pun feature on your site, run: rm assets/js/puns.js"
fi

# 8. Remove any compiled gem extensions (will be recompiled when needed)
echo "Removing compiled gem extensions..."
find vendor/ -name "*.bundle" -delete 2>/dev/null || true
find vendor/ -name "*.o" -delete 2>/dev/null || true
find vendor/ -name "Makefile" -delete 2>/dev/null || true

echo "✅ Cleanup complete!"
echo ""
echo "📊 Space saved:"
du -sh . 2>/dev/null || echo "Could not calculate directory size"
echo ""
echo "🔧 Next steps:"
echo "1. Test your site: bundle exec jekyll serve"
echo "2. Update .gitignore (see recommendations below)"
echo "3. Commit your changes if everything works"
echo ""
echo "📝 Consider also removing assets/js/puns.js if unused"