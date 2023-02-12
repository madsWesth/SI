import sys
from pathlib import Path
from parsers import parseCSV, parseJSON, parseXML, parseYAML, parseTXT

if len(sys.argv) < 2:
    print("expected filetype argument")
    sys.exit(1)

filetype = sys.argv[1][2:]
path = Path("../data/data." + filetype)
match filetype:
    case "csv":
        parseCSV(path)
    case "json":
        parseJSON(path)
    case "xml":
        parseXML(path)
    case "yaml":
        parseYAML(path)
    case "txt":
        parseTXT(path)
    case _:
        print("unknown filetype\nsupported filetype arguments: --csv, --json, --xml, --yaml --txt")
        sys.exit(1)
