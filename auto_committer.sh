#!/bin/bash

# Log start time
echo "======== Script started at $(date) ========" >> /home/ubuntu/fe-gaportal/log.txt

# Change to repo directory
cd /home/ubuntu/fe-gaportal || {
    echo "❌ Failed to enter repo directory" >> /home/ubuntu/fe-gaportal/log.txt
    exit 1
}

# Set Git config (only needed once)
git config user.name "hassnainimran786"
git config user.email "hassnainimran75@gmail.com"

# Generate random number of commits (10–15)
commits_today=$((RANDOM % 6 + 10))
echo "➡️ Making $commits_today commits today..." >> log.txt

for ((i=1; i<=commits_today; i++)); do
    echo "Commit $i at $(date)" >> commit_log.txt
    git add commit_log.txt
    if git commit -m "commit $i on $(date '+%Y-%m-%d')"; then
        echo "✅ Commit $i successful" >> log.txt
    else
        echo "❌ Commit $i failed" >> log.txt
    fi
    sleep $((RANDOM % 300 + 30))  # 30–330 seconds between commits
done

# Pull before pushing to avoid push rejection
if git pull --rebase origin main; then
    echo "✅ Pull (rebase) successful" >> log.txt
else
    echo "❌ Pull (rebase) failed" >> log.txt
fi

# Push changes
if git push origin main; then
    echo "✅ Push successful" >> log.txt
else
    echo "❌ Push failed" >> log.txt
fi

# Log end time
echo "======== Script finished at $(date) ========" >> log.txt
echo "" >> log.txt  # Blank line for clarity

