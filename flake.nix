{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    openspec.url = "github:Fission-AI/OpenSpec";
    openspec.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { nixpkgs, openspec, ... }: {
    devShells = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (system:
      {
        default = nixpkgs.legacyPackages.${system}.mkShell {
          packages = [
            openspec.packages.${system}.default
          ];
        };
      }
    );
  };
}
