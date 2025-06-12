---
layout: post
title: "Bash for logging terminal script"
date: 2025-06-11
custom_excerpt: "so that I don't have to copy and paste every time to avoid GATech OSI"
---
```bash
# Open your .bash_profile in VSCode Terminal
code ~/.bash_profile

# Use nano (built-in terminal editor)
nano ~/.zshrc

# Or open with default text editor
open ~/.zshrc

# Or use vim if you're comfortable with it
vim ~/.zshrc
```
add following to the end of ~/.bash_profile
```bash
# Toggle function for logging
function toggle_logging() {
    if [[ -z "$DISABLE_LOGGING" ]]; then
        export DISABLE_LOGGING=1
        echo "🔴 Terminal logging disabled for new sessions"
    else
        unset DISABLE_LOGGING
        echo "🟢 Terminal logging enabled for new sessions"
    fi
}

# Terminal logging with current directory name (with toggle check)
if [[ -z "$SCRIPT" ]] && [[ -z "$DISABLE_LOGGING" ]]; then
    export SCRIPT=1
    # Get current directory path, replace / with - for filename
    DIR_PATH=$(pwd | sed 's|^/Users/[^/]*/|~/|' | tr '/' '-')
    # Remove leading dash if any
    DIR_PATH=${DIR_PATH#-}
    
    mkdir -p ~/terminal_logs
    LOG_FILE=~/terminal_logs/${TERM_PROGRAM}_${DIR_PATH}_$(date +%Y%m%d_%H%M%S).log
    echo "📝 Terminal session being logged to: $LOG_FILE"
    script -q "$LOG_FILE"
fi
```

```bash
# Open your .zshrc
code ~/.zshrc
```

add following to the end of ~/.bash_profile
```bash
# Toggle function for logging
function toggle_logging() {
    if [[ -z "$DISABLE_LOGGING" ]]; then
        export DISABLE_LOGGING=1
        echo "🔴 Terminal logging disabled for new sessions"
    else
        unset DISABLE_LOGGING
        echo "🟢 Terminal logging enabled for new sessions"
    fi
}

# Terminal logging with current directory name (with toggle check)
if [[ -z "$SCRIPT" ]] && [[ -z "$DISABLE_LOGGING" ]]; then
    export SCRIPT=1
    # Get current directory path, replace / with - for filename
    DIR_PATH=$(pwd | sed 's|^/Users/[^/]*/|~/|' | tr '/' '-')
    # Remove leading dash if any
    DIR_PATH=${DIR_PATH#-}
    
    mkdir -p ~/terminal_logs
    LOG_FILE=~/terminal_logs/${TERM_PROGRAM}_${DIR_PATH}_$(date +%Y%m%d_%H%M%S).log
    echo "📝 Terminal session being logged to: $LOG_FILE"
    script -q "$LOG_FILE"
fi
```
