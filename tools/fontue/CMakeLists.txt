cmake_minimum_required(VERSION 2.8.9)
project (fontue)

if(WIN32)
SET(FREETYPE_INCLUDE_DIRS "freetype2/include")
SET(FREETYPE_LIBRARIES "freetype2/lib/freetype")
else()
find_package(Freetype REQUIRED)
endif()

include_directories(${FREETYPE_INCLUDE_DIRS})

SET(CMAKE_CXX_FLAGS "-O2 -std=c++11")
SET(CMAKE_EXE_LINKER_FLAGS "-v")

file(GLOB SOURCES "src/*.cpp")
add_executable(fontue ${SOURCES})
target_link_libraries(fontue ${FREETYPE_LIBRARIES})
