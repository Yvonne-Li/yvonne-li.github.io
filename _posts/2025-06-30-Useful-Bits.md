---
layout: post
title: "Useful Bits"
date: 2025-06-30
custom_excerpt: "use it often"
---
In Jupyter Notebook, wrap all .py ipynb files into one zip file
```bash
find . -type f \( -name "*.py" -o -name "*.ipynb" \) -print0 | tar --null -czvf notebook.tar.gz --files-from=-
```


when you need to upload all the zip files into Jupyter Notebook again, open a new Terminal, and run:
```bash
tar -xvzf notebook.tar.gz
#or to run directly from Jupyter Notebook
!tar -xvzf notebook.tar.gz
```


from **Effective Python**:
```python
template = "{0:.2f} {1:s} are worth US${2:d}"
template.format(88.46, "Argentine Pesos", 1)
#output: '88.46 Argentine Pesos are worth US$1'
```
