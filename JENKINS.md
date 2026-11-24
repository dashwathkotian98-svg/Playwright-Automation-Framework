# Running this framework in Jenkins

This repository contains a Jenkins Pipeline in `Jenkinsfile`. It runs the
Playwright tests on a Windows agent and archives test artifacts.

## Jenkins prerequisites

1. Install the **Pipeline**, **Git**, **NodeJS**, and **HTML Publisher** Jenkins
   plugins.
2. In **Manage Jenkins > Tools**, configure a NodeJS installation named `NodeJS`.
3. Configure a Windows agent. The pipeline uses Windows `bat` steps, so the
   node selected by `agent any` must be Windows. Ensure the agent can
   access the internet to install npm packages and the Playwright Chromium
   browser.

The NodeJS tool name must match the value in `Jenkinsfile`, or the Jenkinsfile
must be updated to match your Jenkins configuration.

## Create the job

1. In Jenkins, create a **Pipeline** job.
2. Under **Pipeline**, select **Pipeline script from SCM** and choose **Git**.
3. Enter this repository's URL, the branch to build, and credentials if the
   repository is private.
4. Set **Script Path** to `Jenkinsfile`, save, and choose **Build Now**.

The pipeline checks out the source, runs `npm ci`, installs Playwright
Chromium, and runs `npx playwright test`. It archives Playwright test results
for debugging and publishes a **Playwright HTML Report** link on the Jenkins
build page. The test that sends a real signup verification email is skipped in
CI.
