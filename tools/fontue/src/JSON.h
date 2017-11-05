#pragma once

/**
 * Minimal JSON writer that follows the mobile SDK API
 */

class JSON {
  std::map<std::string, std::string> objectValues;
  std::map<std::string, std::string> objectStrings;
  std::map<std::string, JSON*> objectJson;
  std::vector<JSON*> array;

  static std::string MakeSafe(std::string const& str) {
    std::string out;
    for (auto i = 0; i < str.length(); ++i) {
      switch (str[i]) {
        case '\\':
        case '\"':
          out.append(1, '\\');
          break;
        default:
          break;
      }
      out.append(1, str[i]);
    }
    return out;
  }

 public:
  static JSON* CreateObject() {
    return new JSON;
  }

  static JSON* CreateArray() {
    return new JSON;
  }

  void AddNumberItem(std::string name, double number) {
    if (floor(number) == number) {
      objectValues[name] = std::to_string((int)number);
    } else {
      objectValues[name] = std::to_string(number);
    }
  }
  void AddStringItem(std::string name, std::string item) {
    objectStrings[name] = MakeSafe(item);
  }
  void AddItem(std::string name, JSON* item) {
    objectJson[name] = item;
  }
  void AddArrayElement(JSON* item) {
    array.push_back(item);
  }

  void Save(FILE* f) {
    if (array.size()) {
      fprintf(f, "[\n");
      for (auto c = array.begin(); c != array.end(); c++) {
        if (c != array.begin()) {
          fprintf(f, ",\n");
        }
        (*c)->Save(f);
      }
      fprintf(f, "]");
    } else {
      fprintf(f, "{\n");
      bool doneFirst = false;
      for (auto c = objectValues.begin(); c != objectValues.end(); c++) {
        if (doneFirst) {
          fprintf(f, ",\n");
        }
        fprintf(f, "\"%s\": %s", c->first.c_str(), c->second.c_str());
        doneFirst = true;
      }
      for (auto c = objectStrings.begin(); c != objectStrings.end(); c++) {
        if (doneFirst) {
          fprintf(f, ",\n");
        }
        fprintf(f, "\"%s\": \"%s\"", c->first.c_str(), c->second.c_str());
        doneFirst = true;
      }
      for (auto c = objectJson.begin(); c != objectJson.end(); c++) {
        if (doneFirst) {
          fprintf(f, ",\n");
        }
        fprintf(f, "\"%s\": ", c->first.c_str());
        c->second->Save(f);
        doneFirst = true;
      }
      fprintf(f, "}");
    }
  }

  void Save(std::string filename) {
    FILE* f = fopen(filename.c_str(), "wb");
    if (f) {
      Save(f);
      fclose(f);
    }
  }
};
