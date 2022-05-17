{ pkgs ? import <nixpkgs> {} }:
with pkgs;

let

in mkShell {
  buildInputs = [
    yarn
    nodejs-16_x
  ];
}
