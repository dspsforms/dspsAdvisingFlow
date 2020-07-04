#! /usr/bin/perl

# installing perl libraries on the prod server seems to be an issue
# so using simple old perl


# use 5.010;
# use open qw(:locale);
# use strict;
# use utf8;
# use warnings qw(all);
# use TryCatch;
# use File::Copy;

my $inFileName = "../dspsmisc-backend/angular-print/index.html";

my $outFileName = "../dspsmisc-backend/angular-print/indexModified.html";

my $indexOrig = "../dspsmisc-backend/angular-print/indexOrig.html";

# try {
  open(my $inHandle, '<', $inFileName);

  open(my $outHandle, '>', $outFileName);

  while (<$inHandle>) {
    if (/\"assets\//) {
      # say $_;

      s/\"assets\//\"\/foo\/assets\//g;
      # say "replacement: $_";

      # no comma after file handle
      print $outHandle $_ ;
    } else {
      print($outHandle $_);
    }
  }

  close $inHandle;
  close $outHandle;
  print "... index.html modification done \n";

  # move ($inFileName, $indexOrig) or die "move failed: $!";

  # copy($outFileName, $inFileName ) or die "Copy failed: $!";

  # # delete outFileName
  # unlink($outFileName)  or die "unlink failed: $!";

  # say "... index.html moved to $indexOrig. modifications in index.html";

# } catch ($err) {
#         say "$err";
# }
