---
layout: post
title: "conda vs venv"
date: 2024-10-20
custom_excerpt: "how to use conda or venv"

---

conda needs a environment.yaml file to determine the packages needed

```bash
python3 -m venv .venv
source myvenv/bin/activate
which python
pip install -r /Users/requirements.txt
pip3 uninstall -r requirements.txt -y
```

The only solution I found was to delete the `venv` and recreate it. I followed these steps but I'll provide a brief summary for Windows:

1. Activate your virtualenv. Go to the parent folder where your Virtual Environment is located and run `venv\scripts\activate`. Keep in mind that the first name "venv" can vary.
2. Create a requirements.txt file. `pip freeze requirements.txt`
3. `deactivate` to exit the venv
4. `rm venv` to delete the venv
5. `py -m venv venv` to create a new one
6. `pip install -r requirements.txt` to install the requirements.

to make sure install all the packages in requirements.txt
`cat requirements.txt | sed -e '/^\s*#.*$/d' -e '/^\s*$/d' | xargs -n 1 python -m pip install`