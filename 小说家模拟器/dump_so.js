var exports = Module.enumerateExportsSync("libil2cpp.so");
var libxx = Process.getModuleByName("libil2cpp.so");
console.log("*****************************************************");
console.log("name: " +libxx.name);
console.log("base: " +libxx.base);
console.log("size: " +ptr(libxx.size));

var exports = Module.enumerateExportsSync("libil2cpp.so");
for(var i = 0; i < exports.length; i++) {
        console.log(exports[i].name + ": " + (exports[i].address - libxx.base));
}
// dump so
var file_path = "/data/local/tmp/" +  "1.so";
var file_handle = new File(file_path, "wb");
if (file_handle && file_handle != null) {
    Memory.protect(ptr(libxx.base), libxx.size, 'rwx');
    var libso_buffer = ptr(libxx.base).readByteArray(libxx.size);
    file_handle.write(libso_buffer);
    file_handle.flush();
    file_handle.close();
    console.log("[dump]:", file_path);
}
