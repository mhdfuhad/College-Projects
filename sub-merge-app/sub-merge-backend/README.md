# sub-merge-backend

## Group 4 - PRJ666

### `FRONT-END Link: https://sub-merge-application.vercel.app/`

### `API Link: https://submerge-backend.herokuapp.com/`

## Available Scripts

In this project directory, you can run:

### `npm start`

Runs the app.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `npm run lint`

Runs the app using eslint.

### `npm run dev`

Runs the app in the development mode using nodemon.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `npm run debug`

Runs the app in the development mode using nodemon.\
Starts the node inspector on port 9229 with the --inspect flag.\

> **_NOTE:_** Have Toggle Auto Attach on VSCode set to 'only with flag' so that debugger is only attached\
> when running this command that has the --inspect flag.

## Guidelines and Instructions to be followed.

### Guidelines

- Do not change the file structure

  > Adding files does not require changing the file structure, a directory can be added if required and that again should not change the file structure. Please do not delete or move files without asking the team first. Any restructuring to be done to the file structure will be done as a team for everyone to be aware.

- Follow good coding practices

  > Try not to write spaghetti code and make it work somehow as there will always be some code that is irrelevant and not required to be there, understand any code that is added before you add it.

- Do not remove code from the main files such as index.js or app.js

  > There are many files where the code is shared and multiple members will be working on the same file at times do not ever rewrite the whole file or remove code from these files that can cause something to stop working.

- Use VSCode extensions to automate some of your work
  > Install Prettier and ESLint in your VSCode, prettier is already setup in the settings.json file to format your code on save and we will also be using ESLint to lint through the code for any basic bugs.

#### Error and Bugs Handling

- Try to diagnose where the problem is created few things you can do to debug.
  - Add console.log with appropriate logging information where you think the code breaks
  - Use the developers console on chrome to check any logs or error messages
  - Use the google developer debug tools to add breakpoints and see where the code possibly breaks.
- Try googling the error, there might be someone with a similar problem and there has been a solution for it posted somewhere.
- If you have already tried the above ways and still can't seem to fix it, as long as you have the done the above steps properly you must be able to have a general idea of where in the code the problem is being caused. Relay it to your teammates what the problem is and where you're facing it possibly and any ideas of why you think it might be caused.

### Github Instructions (Git with terminal method)

- Create a new branch to work on the issue/feature

```
git branch {issue/featureName_workingBranch}
```

- Switch to the branch

```
git checkout {issue/featureName_workingBranch}
```

- Work on your code
- Commit all changes
- Push the changes within that branch to the Remote Repo

```
git push origin {issue/featureName_workingBranch}
```

- Switch to master branch

```
git checkout master
```

- Delete the branch you created earlier to work on the feature

```
git branch -D {issue/featureName_workingBranch}
```

- Pull the recent updates made to the master branch

```
git pull
```

> This above step is required for you to be done when yours and others working branch has been merged to the master branch so then you have all the updated files and then can move on to creating a new branch and working on the next feature.

- Repeat above instructions to work on next feature

#### Extra GitHub Information

> If you're not done working on your feature on the newly created branch but the master branch was updated with new code. You may follow these instructions to update your branch to add the most recent changes made to master.

- Switch to master branch

```
git checkout master
```

- Pull the recent updates made to the master branch

```
git pull
```

- Switch back to your working branch

```
git checkout {issue/featureName_workingBranch}
```

- Do a fetch

```
git fetch
```

- Do a merge to update your branch with all updates made to master

```
git merge --no-ff origin/master
```
