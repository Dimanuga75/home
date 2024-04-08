import fileInclude from "gulp-file-include";
//import webpHtmlNosvg from "gulp-webp-html-nosvg";
//import versionNumber from "gulp-version-number";

export const html2 = () => {
  return app.gulp
    .src(app.path.src.html2)
    .pipe(fileInclude())
    .pipe(app.gulp.dest(app.path.build.html2));
};
