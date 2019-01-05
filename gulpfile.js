const gulp = require('gulp');
const logger = require('log4js').getLogger('gulp');

const runCommand = async (command) => {
  const run = require('gulp-run');

  return new Promise((resolve, reject) => {
    run(command, {verbosity: 3}).exec((err) => {
      if (err) {
        logger.error(err);
        reject(err);
      }
      resolve();
    });
  });
};

const assemble = async () => {
  const zip = require('gulp-zip');

  const outDir = 'build/out/';
  const distDir = 'build/dist/';
  const buildOutputDirectory = 'dist';

  await runCommand('npm run build');

  return gulp.src([buildOutputDirectory + '/**/*', 'package.json', 'config/*.json'], {base: './'})
    .pipe(gulp.dest(outDir))
    .pipe(zip('picky.zip'))
    .pipe(gulp.dest(distDir));
};

const test = function () {
  const mocha = require('gulp-mocha');
  const defaultSrc = ['test/**/*.spec.js', 'test/**/*.spec.ts'];
  return gulp.src(defaultSrc, {base: '.'})
    .pipe(mocha({
      exit: true,
      require: ['ts-node/register/type-check']
    }));
};


const lint = async () => {
  const gulpTslint = require("gulp-tslint");
  const tslint = require("tslint");

  const program = tslint.Linter.createProgram("tsconfig.json");

  return gulp.src(['**/*.ts', '!node_modules/**'])
    .pipe(gulpTslint({program}));
};

const clean = () => {
  const del = require('del');

  return del(['build', 'dist']);
};

const reinstall = async () => {
  await runCommand('npm prune');
  await runCommand('npm install');
};

const build = () => {
  const zip = require('gulp-zip');

  return gulp.src(['**/*', '!node_modules/**', '!package-lock.json'], {dot: true})
    .pipe(zip('picky.zip'))
    .pipe(gulp.dest('build/dist/'));
};

gulp.task('default', build);

gulp.task('clean', clean);

gulp.task('reinstall', reinstall);

gulp.task('assemble', gulp.series('clean', assemble));

gulp.task('test', test);

gulp.task('lint', lint);

gulp.task('build', gulp.series('clean', 'reinstall', 'test', 'lint', build));

