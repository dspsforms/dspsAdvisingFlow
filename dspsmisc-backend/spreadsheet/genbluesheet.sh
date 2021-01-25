
HOST=10.3.105.175:27017
DB=dspsmisc
COLLECTION=bluesheets
FIELD_FILE=bluesheet_fieldNames.txt

# TODO: generate year, mon, day 
OUT_FILE_STEP1=bluesheet-2021-01-24.step1.csv

OUT_FILE=bluesheet-2021-01-24.csv

# cf https://stackoverflow.com/questions/36319052/use-mongoexport-with-a-query-for-isodate/36322337#36322337
# adding a QUERY shell variable is causing the outside single quote to be lost
# QUERY='{ "created": {  "$gte": { "$date": "2020-07-06T00:00:00.001Z" } } }'

mongoexport --host="${HOST}" --db="${DB}" --collection="${COLLECTION}" --type=csv  \
  --query '{ "created": {  "$gte": { "$date": "2020-07-30T00:00:00.001Z" } } }' \
  --fieldFile="${FIELD_FILE}"  --out="${OUT_FILE_STEP1}"

# multiple sed commands, separated by semi colon
sed 's/formWithLatestHistory.//g; s/\.val\b//g' < ${OUT_FILE_STEP1} > ${OUT_FILE}