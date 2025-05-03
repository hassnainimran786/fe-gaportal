#!/bin/bash

echo "======== Script started at $(date) ========" >> log.txt

# Set Git config if not set
git config user.name "HassnianImran"
git config user.email "hassnainimran75@gmail.com"

# Go to repo directory
cd /home/ubuntu/fe-gaportal || {
    echo "❌ Failed to enter repo directory" >> log.txt
    exit 1
}

# Generate random number of commits (10–15)
commits_today=$((RANDOM % 6 + 10))
echo "➡️ Making $commits_today commits today..." >> log.txt

for ((i=1; i<=commits_today; i++)); do
    echo "Commit $i at $(date)" >> commit_log.txt
    git add commit_log.txt
    if git commit -m "Auto commit $i on $(date '+%Y-%m-%d')"; then
        echo "✅ Commit $i successful" >> log.txt
    else
        echo "❌ Commit $i failed" >> log.txt
    fi
    sleep $((RANDOM % 300 + 30))  # Sleep between 30–330 seconds
done

# Push changes
if git push origin main; then
    echo "✅ Push successful" >> log.txt
else
    echo "❌ Push failed" >> log.txt
fi

echo "======== Script finished at $(date) ========" >> log.txt
echo "" >> log.txt  # Add a blank line for clarity

