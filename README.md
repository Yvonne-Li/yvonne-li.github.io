run following to see the website locally
```bash
bundle exec jekyll serve
```

Debug if run locally not Github:
1. go to web dev tool, console
2. regenerate gemfile.lock
```bash
# Remove Gemfile.lock from .gitignore
sed -i '' '/Gemfile.lock/d' .gitignore

# Generate fresh Gemfile.lock
bundle install

# Commit both files
git add Gemfile.lock .gitignore
git commit -m "Add Gemfile.lock for GitHub Pages"
git push
```

TRY OPENAI API OUT
```Bash
curl -X POST https://yvonne-pun-api.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me puns about cats"}'
```

Create Project structure txt file
```bash
tree -I 'node_modules|.git|dist|build' > project_structure.txt
```

push to repo
```bash
git push origin master
```