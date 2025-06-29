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

TRY OPENAI API out in Bash
```Bash
curl -X POST https://yvonne-pun-api.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Tell me puns about cats"}'
```

Test OPENAI API out in browser console
```Bash
fetch('https://yvonne-pun-api.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Generate puns about cats' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

Create Project structure txt file
```bash
tree -I 'node_modules|.git|dist|build' > project_structure.txt
```

push to repo
```bash
git stash
git pull
git stash pop
git status
git commit -m ""
git push origin master
```