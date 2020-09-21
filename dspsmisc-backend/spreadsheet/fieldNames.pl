use 5.010;
use open qw(:locale);
use strict;
use utf8;
use warnings qw(all);
use TryCatch;
use POSIX;
use String::Util qw(trim);

try {
    while (<>) {
        my @arr = split(',');
        foreach my $fieldName (@arr)  {
            printf "%s\n",  trim($fieldName);
        }
    }

} catch ($err) {
    say "ERROR $err";
}

