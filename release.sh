#!/bin/bash

if [[ $1 == "publish" ]]; then
    read -p "Write YES to confirm new release creation: " confirmation
    if [[ $confirmation == "YES" ]]; then
    	echo "Existing releases:"
        git tag
        echo -ne "What is the release version: "
        read releaseVersion
        if [ -z "$releaseVersion" ]; then
            echo "Release version cannot be empty"
            exit 1
        fi
        CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
        if [[ $CURRENT_BRANCH != "master" ]]; then
            git checkout master
        fi
        git merge --no-ff -m "Merge latest development version" develop
        git tag -a $releaseVersion -m "Release $releaseVersion"
        git push
        git push origin $releaseVersion
        git checkout develop
    else
        echo "Release preparation cancelled"
    fi
else
    echo "Usage: ./release.sh publish"
fi