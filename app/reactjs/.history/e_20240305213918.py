import pygame
import random

pygame.init()

# Définition des variables globales
SCREEN_WIDTH, SCREEN_HEIGHT = 300, 600
BLOCK_SIZE = 30
GRID_WIDTH, GRID_HEIGHT = SCREEN_WIDTH // BLOCK_SIZE, SCREEN_HEIGHT // BLOCK_SIZE
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)
CYAN = (0, 255, 255)
MAGENTA = (255, 0, 255)
ORANGE = (255, 165, 0)
GRAY = (128, 128, 128)

SHAPES = [
    [[1, 1, 1],
     [0, 1, 0]],

    [[0, 2, 2],
     [2, 2, 0]],

    [[3, 3, 0],
     [0, 3, 3]],

    [[4, 0, 0],
     [4, 4, 4]],

    [[0, 0, 5, 0],
     [5, 5, 5, 5]],

    [[0, 6, 0],
     [6, 6, 6],
     [0, 0, 0]]
]

class Piece:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.shape = random.choice(SHAPES)
        self.color = random.choice([RED, GREEN, BLUE, YELLOW, CYAN, MAGENTA, ORANGE])
        self.rotation = 0

    def rotate(self):
        self.rotation = (self.rotation + 1) % 4
        self.shape = self._rotate_shape()

    def _rotate_shape(self):
        return [[self.shape[y][x] for y in range(len(self.shape))] for x in range(len(self.shape[0])-1, -1, -1)]

    def draw(self, screen):
        for y in range(len(self.shape)):
            for x in range(len(self.shape[y])):
                if self.shape[y][x]:
                    pygame.draw.rect(screen, self.color, (self.x*BLOCK_SIZE + x*BLOCK_SIZE, self.y*BLOCK_SIZE + y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
                    pygame.draw.rect(screen, WHITE, (self.x*BLOCK_SIZE + x*BLOCK_SIZE, self.y*BLOCK_SIZE + y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 2)

    def move_down(self):
        self.y += 1

    def move_left(self):
        self.x -= 1

    def move_right(self):
        self.x += 1

    def check_collision(self, grid):
        for y in range(len(self.shape)):
            for x in range(len(self.shape[y])):
                if self.shape[y][x]:
                    if self.y + y >= GRID_HEIGHT or self.x + x < 0 or self.x + x >= GRID_WIDTH or grid[self.y + y][self.x + x]:
                        return True
        return False

    def lock_piece(self, grid):
        for y in range(len(self.shape)):
            for x in range(len(self.shape[y])):
                if self.shape[y][x]:
                    grid[self.y + y][self.x + x] = self.color

def create_grid():
    return [[BLACK for _ in range(GRID_WIDTH)] for _ in range(GRID_HEIGHT)]

def draw_grid(screen, grid):
    for y in range(GRID_HEIGHT):
        for x in range(GRID_WIDTH):
            pygame.draw.rect(screen, grid[y][x], (x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
            pygame.draw.rect(screen, WHITE, (x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 1)

def draw_next_piece(screen, piece):
    font = pygame.font.SysFont(None, 30)
    text = font.render('Next Piece:', True, WHITE)
    screen.blit(text, (SCREEN_WIDTH + 20, 50))
    for y in range(len(piece.shape)):
        for x in range(len(piece.shape[y])):
            if piece.shape[y][x]:
                pygame.draw.rect(screen, piece.color, (SCREEN_WIDTH + 20 + x*BLOCK_SIZE, 100 + y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
                pygame.draw.rect(screen, WHITE, (SCREEN_WIDTH + 20 + x*BLOCK_SIZE, 100 + y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 2)

def main():
    screen = pygame.display.set_mode((SCREEN_WIDTH + 200, SCREEN_HEIGHT))
    pygame.display.set_caption("Tetris")
    clock = pygame.time.Clock()
    game_over = False
    grid = create_grid()
    piece = Piece(GRID_WIDTH // 2, 0)
    next_piece = Piece(GRID_WIDTH // 2, 0)

    while not game_over:
        screen.fill(BLACK)
        piece.draw(screen)
        draw_next_piece(screen, next_piece)
        draw_grid(screen, grid)

        pygame.display.update()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    piece.move_left()
                    if piece.check_collision(grid):
                        piece.move_right()
                if event.key == pygame.K_RIGHT:
                    piece.move_right()
                    if piece.check_collision(grid):
                        piece.move_left()
                if event.key == pygame.K_DOWN:
                    piece.move_down()
                    if piece.check_collision(grid):
                        piece.move_up()
                        piece.lock_piece(grid)
                        piece = next_piece
                        next_piece = Piece(GRID_WIDTH // 2, 0)
                        if piece.check_collision(grid):
                            game_over = True
                if event.key == pygame.K_UP:
                    piece.rotate()
                    if piece.check_collision(grid):
                        piece.rotate_back()

        if not game_over:
            piece.move_down()
            if piece.check_collision(grid):
                piece.move_up()
                piece.lock_piece(grid)
                piece = next_piece
                next_piece = Piece(GRID_WIDTH // 2, 0)
                if piece.check_collision(grid):
                    game_over = True

        clock.tick(5)

    pygame.quit()

if __name__ == "__main__":
    main()
