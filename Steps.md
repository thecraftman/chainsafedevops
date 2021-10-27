# DevOps Task

## What is GitHub actions? 

GitHub actions is greatly used for automating developer workflows, it's the built-in CI/CD tool for GitHub. 

GitHub actions essentially allowed me to automate the testing of this code (depending on certain criteria), after all the tests are passed, I enabled actions to automate the delivery of the code. 

## Why GitHub actions? 

- It significantly reduced the time it took for me to deliver updates to this application. 
- Simplified the automation of my workflow. 

## Overview

**GitHub Repository: https://github.com/thecraftman/chainsafedevops**

The name of my Docker Repository is `tolatemitope/chainsafedevops` 

In the repo, you can see the images from the release and push workflow. 

- A new image is published anytime the docker image is created. 

https://hub.docker.com/r/tolatemitope/chainsafedevops/tags

- In the Pull Request view, you can see the team label for each workflow. 

https://github.com/thecraftman/chainsafedevops/pulls

- Also, the unit test are passing when the pull request is created. 

GitHub Actions link: https://github.com/thecraftman/chainsafedevops/actions

- Build workflow: https://github.com/thecraftman/chainsafedevops/actions/workflows/push.yml

- Label workflow: https://github.com/thecraftman/chainsafedevops/actions/workflows/labeler.yml

- Release workflow: https://github.com/thecraftman/chainsafedevops/actions/workflows/release.yml

- Unit-test workflow: https://github.com/thecraftman/chainsafedevops/actions/workflows/test.yml


### GitHub Actions Workflow Roadmap

![chainsafe drawio](https://user-images.githubusercontent.com/24816990/138957082-83aece7c-adb4-4db8-9919-14bda04b3aa5.png)

### Secrets 

Secrets are stored in my GitHub repository on GitHub, I have the following Action secrets: 

- DOCKER_PASSWORD
- DOCKER_USER
- TOKEN

## Workflow Setup 

In the `.github/workflow` directory there are four (4) files there. 

- labeler.yml
- push.yml
- release.yml
- test.yml

1. The **labeler.yml** workflow is used to label pull requests based on the files changed. To starts using the `Labeler` gitHub action, you need to create a the `.github/workflows/labeler.yml` file that contains the workflow for you to utilize the labeler action with your content. The labeler action only needs the `GITHUB_TOKEN` secret (which can be stored in your repository on GitHub). This secret lets you interact with the GitHub API to modify your labels and also make calls to GitHub's rest API. 

> **Note: By default, the file name is `label.yml` . Make sure you have `labeler.yml` as the file name.**

After creating your workflow, you need to create a `.github/labeler.yml` file with a list of labels to match your action configuration.  So on the `.github/labeler.yml` file you can configure the action to assign team labels per file by specifying the file path. 

In the `.github/labeler.yml` file, there are four team labels; `team/backend`, `team/qa`, `team/docs` and `team/devops`

Files in a Folder follows the convention of `/*`

2. **push.yml:** The push workflow will deploy a docker image under the `main` tag when the pull request is merged. It will check out my repository under my GitHub workspace so that the job can access it. It's going to build and push the docker image to the repository. 

The **DOCKER_USER** and **DOCKER_PASSWORD** environmental variables are stored as secrets in my Github repository settings. 

3. **release.yml:** The release workflow is configured to build and push a docker image when there a tag is created. The tag follows the [semver](https://semver.org) convention. The image is published using the Docker `build-push-action action` to my Docker registry and the name of the image is `tolatemitope/chain-test` 

4. **test.yml:** The test.yml workflow runs unit testing, it gets triggered when a pull request is created. When the configuration occurs, it will run the job within the workflow. The name of the job is `test-unit` 

The strategy matrix allows you to create multiple jobs by performing variable substitution in a single job definition. Im my `test.yml` file i'm using the strategy matrix to create the job for node-version 12.x, 13.x, 14.x, 15.x and 16.x. 

