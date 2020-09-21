
HOST=10.3.105.175:27017
DB=dspsmisc
COLLECTION=bluesheets
FIELD_FILE=bluesheet_fieldNames.txt

# TODO: generate year, mon, day 
OUT_FILE=bluesheet-2010-09-21.csv

mongoexport --host="${HOST}" --db="${DB}" --collection="${COLLECTION}" --type=csv  --fieldFile="${FIELD_FILE}"  --out="${OUT_FILE}"
