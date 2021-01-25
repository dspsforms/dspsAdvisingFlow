
# HOST=10.3.105.175:27017
DB=dspsmisc
COLLECTION=bluesheets
FIELD_FILE=bluesheet_fieldNames.txt

# TODO: generate year, mon, day 
OUT_FILE_STEP1=bluesheet-test.step1.csv

OUT_FILE=bluesheet-test.csv

# cf https://stackoverflow.com/questions/36319052/use-mongoexport-with-a-query-for-isodate/36322337#36322337
# the outside single quote needs to be passed to query. but this way it's not happening
# QUERY='{ "created": {  "$gte": { "$date": "2020-07-26T00:00:00.001Z" } } }'

# echo query= $QUERY

mongoexport --db="${DB}" --collection="${COLLECTION}" \
 --query '{ "created": {  "$gte": { "$date": "2020-07-30T00:00:00.001Z" } } }' \
 --type=csv  --fieldFile="${FIELD_FILE}"  --out="${OUT_FILE_STEP1}"


# multiple sed commands, separated by semi colon
sed 's/formWithLatestHistory.//g; s/\.val\b//g' < ${OUT_FILE_STEP1} > ${OUT_FILE}