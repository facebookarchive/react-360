cmake_minimum_required(VERSION 2.8)

project (eq2cm)
set(CMAKE_BUILD_TYPE Release)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/.)
add_executable(eq2cm eq2cm.cpp)
