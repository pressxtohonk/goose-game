{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    openspec.url = "github:Fission-AI/OpenSpec";
    openspec.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { nixpkgs, openspec, ... }: {
    devShells = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        default = pkgs.mkShell {
          packages = [
            openspec.packages.${system}.default
            pkgs.nodejs_22
            pkgs.http-server
            pkgs.typescript
            pkgs.just
            pkgs.tsx
          ];
        };
      }
    );
  };
}
