#
# output will be in backend/angular (this destination is specified in angular.json)

# ng build --prod
# ng build --prod --deploy-url=/printAssets
# ng build --prod --baseHref=/foo
# ng build --prod --baseHref=/foo --deployUrl=/foo/

ng build --prod --deployUrl=/foo/

perl addDeploy.pl

# we are not able to use cpan libs in prod for some reason. so do these here

inFileName=../dspsmisc-backend/angular-print/index.html

outFileName=../dspsmisc-backend/angular-print/indexModified.html

indexOrig=../dspsmisc-backend/angular-print/indexOrig.html

mv $inFileName $indexOrig
cp $outFileName $inFileName
rm $outFileName





